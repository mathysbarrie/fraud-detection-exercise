# Exercice Technique : Pipeline de Detection de Fraude (90min)

## Contexte

Vous rejoignez une equipe qui developpe un systeme de validation de commandes e-commerce. Votre mission : implementer **Module 2 - Risk Scoring Worker** d'un pipeline BullMQ de detection de fraude.

**Stack:** Node.js + TypeScript + BullMQ + Redis + Jest

---

## Architecture Globale

```
Webhook E-commerce (simule)
    |
    v
[Module 1: Order Ingestion Worker]  <-- Deja implemente
    |
    | Push job vers queue "risk-scoring"
    v
[Module 2: Risk Scoring Worker]     <-- TON MODULE A IMPLEMENTER
    |
    | Calcule risk_score (0-100)
    | Push job vers queue "notification"
    v
[Module 3: Notification Worker]     <-- Spec fournie, pas d'implementation requise
```

---

## Ce qui est fourni (Starter Kit)

```
fraud-detection-exercise/
├── package.json              # Dependances deja configurees
├── tsconfig.json             # Config TypeScript
├── docker-compose.yml        # Redis local
├── src/
│   ├── workers/
│   │   ├── order-ingestion.worker.ts   # Deja implemente
│   │   └── risk-scoring.worker.ts      # TON FICHIER (vide)
│   ├── services/
│   │   └── risk-scoring.service.ts     # TON FICHIER (vide)
│   ├── types/
│   │   └── index.ts                    # Types fournis
│   └── utils/
│       └── redis.ts                    # Client Redis pre-configure
├── tests/
│   └── risk-scoring.test.ts            # TON FICHIER (vide)
├── scripts/
│   └── trigger-order.ts                # Script pour tester (fourni)
└── PLAN.md                             # Plan de travail (vide - a remplir)
```

---

## Ta Mission : Module 2 - Risk Scoring Worker

### Input (Job recu de la queue `risk-scoring`)

```typescript
interface RiskScoringInput {
  orderId: string;
  customerId: string;
  customerEmail: string;
  totalAmount: number;        // En cents (ex: 5000 = 50 EUR)
  shippingCountry: string;    // ISO code (FR, US, etc.)
  paymentMethod: 'card' | 'paypal' | 'crypto';
  orderHistory: {
    totalOrders: number;      // Nb de commandes du client
    avgAmount: number;        // Montant moyen historique
    lastOrderDate: string;    // ISO date
  };
}
```

### Output (Job pushe vers queue `notification`)

```typescript
interface RiskScoringOutput {
  orderId: string;
  riskScore: number;          // 0-100 (0 = safe, 100 = fraud)
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];            // Liste des red flags detectes
  scoredAt: string;           // ISO timestamp
}
```

---

## Algorithme de Calcul du Risk Score

**Score de base : 0 points**

Ajouter des points selon ces regles :

| # | Regle | Points | Condition | Flag |
|---|-------|--------|-----------|------|
| 1 | Montant anormal | +30 | `totalAmount > avgAmount * 3` ET `totalOrders > 0` | `abnormal_amount` |
| 2 | Nouveau client a risque | +25 | `totalOrders === 0` ET `totalAmount > 10000` (>100 EUR) | `new_customer_high_amount` |
| 3 | Pays a risque | +20 | `shippingCountry` dans `['NG', 'GH', 'PK', 'BD']` | `high_risk_country` |
| 4 | Paiement crypto | +15 | `paymentMethod === 'crypto'` | `crypto_payment` |
| 5 | Commande rapprochee | +10 | `lastOrderDate < 1 heure` ET `totalOrders > 0` | `rapid_ordering` |

### Risk Level (base sur le score final)

- **0-30** : `low`
- **31-60** : `medium`
- **61-100** : `high`

---

## Sous-Taches a Realiser

### Phase 1 : Planification (10min)

- [ ] Lire toute la spec
- [ ] Remplir `PLAN.md` avec les etapes de developpement
- [ ] Decouper en sous-taches claires (commits atomiques)

### Phase 2 : Implementation (50min)

- [ ] Creer `risk-scoring.service.ts` avec l'algorithme
  - Methode `calculateRiskScore(input): RiskScoringOutput`
  - Chaque regle = fonction separee
  - Documentation JSDoc sur chaque fonction
- [ ] Creer `risk-scoring.worker.ts` (BullMQ processor)
  - Ecoute la queue `risk-scoring`
  - Appelle le service, push vers queue `notification`
  - Gestion d'erreurs (retry 3x avec backoff exponentiel)
- [ ] Tests unitaires (`risk-scoring.test.ts`)
  - Au moins 5 test cases couvrant les regles
  - Test: nouveau client montant normal -> score 0
  - Test: cumul de plusieurs flags -> score correct

### Phase 3 : Documentation & Tests (20min)

- [ ] Documenter `risk-scoring.service.ts` (JSDoc)
- [ ] Tester manuellement avec `npm run trigger-order`
- [ ] Verifier que les tests passent avec `npm test`

### Phase 4 : Demo (10min)

```bash
# Lancer Redis
docker-compose up -d

# Lancer le worker
npm run dev

# Trigger des commandes test
npm run trigger-order

# Montrer les logs (score calcule, flags detectes)
```

---

## Criteres d'Evaluation

### Code Quality (30%)
- TypeScript strict active, pas de `any`
- Fonctions pures, separation des responsabilites
- Gestion d'erreurs complete
- Logs clairs et structures

### Methodologie (40%)
- `PLAN.md` rempli AVANT de coder
- Commits atomiques avec messages clairs
- Tests passent (`npm test`)

### Documentation (20%)
- JSDoc sur toutes les fonctions publiques
- Code commente aux endroits complexes
- Types exportes et documentes

### Fonctionnel (10%)
- Worker demarre sans erreur
- Calcul de score correct (tests passent)
- Job pushe vers queue notification
- Demonstration manuelle fonctionne

---

## Livrables Attendus

1. **Fichiers crees/modifies :**
   - `PLAN.md` (plan de travail detaille)
   - `src/workers/risk-scoring.worker.ts`
   - `src/services/risk-scoring.service.ts`
   - `tests/risk-scoring.test.ts`

2. **Demo live (5min) :**
   - Lancer le worker
   - Trigger un ordre
   - Montrer les logs

---

## Contraintes

- Pas d'internet sauf :
  - Documentation officielle (TypeScript, BullMQ, Jest)
  - GitHub (push/PR)
- Pas de ChatGPT / Copilot
- Utilisation normale de l'IDE (autocomplete, refactor)

---

## Exemple de Resultat Attendu

Pour `ORD-001` (client normal) :
```json
{
  "orderId": "ORD-001",
  "riskScore": 0,
  "riskLevel": "low",
  "flags": [],
  "scoredAt": "2024-01-15T10:30:00.000Z"
}
```

Pour `ORD-002` (fraude potentielle - nouveau client, Nigeria, crypto) :
```json
{
  "orderId": "ORD-002",
  "riskScore": 60,
  "riskLevel": "medium",
  "flags": ["new_customer_high_amount", "high_risk_country", "crypto_payment"],
  "scoredAt": "2024-01-15T10:30:01.000Z"
}
```

---

Bonne chance !
