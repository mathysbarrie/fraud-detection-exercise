# Grille d'Evaluation - Risk Scoring Exercise

> **CONFIDENTIEL** - Ne pas partager avec les candidats

---

## Grille Detaillee

| Critere | Poids | 0/5 | 1/5 | 3/5 | 5/5 |
|---------|-------|-----|-----|-----|-----|
| **Plan de travail** | 15% | Pas de plan | Plan basique | Plan detaille | Plan + decoupage sous-taches |
| **Architecture code** | 15% | Tout dans 1 fichier | Separation minimale | Service + Worker | + Types + Utils bien utilises |
| **Qualite TypeScript** | 10% | Plein de `any` | Quelques types | Types stricts | Types + Generics |
| **Tests** | 15% | Pas de tests | 1-2 tests basiques | 5 tests + edge cases | TDD + bonne couverture |
| **Documentation** | 15% | Pas de doc | README basique | JSDoc + README | + Exemples clairs |
| **Git/Commits** | 15% | 1 commit | Commits vagues | Commits atomiques | Messages descriptifs |
| **Fonctionnel** | 10% | Ne marche pas | Bugs | Fonctionne | + Logs clairs |
| **Demo/Explication** | 5% | Confus | Basique | Claire | + Justifie choix techniques |

---

## Calcul du Score

Pour chaque critere :
- Note sur 5 x Poids = Points

**Score total : /100**

---

## Seuils de Decision

| Score | Decision |
|-------|----------|
| < 40 | Refuse |
| 40-59 | Douteux (discuter en equipe) |
| 60-79 | Valide |
| >= 80 | Excellent (fast-track) |

---

## Red Flags (elimination directe si plusieurs)

- [ ] Commence a coder sans lire toute la spec
- [ ] Pas de `PLAN.md` ou rempli apres coup
- [ ] Tout dans 1 fichier (pas de separation service/worker)
- [ ] Pas de tests ou tests ecrits en dernier recours
- [ ] Pas de JSDoc
- [ ] 1 gros commit "Done" au lieu de commits atomiques
- [ ] Ne peut pas expliquer ses choix techniques

---

## Green Flags (bonus)

- [ ] TDD (tests ecrits avant le code)
- [ ] Gestion des edge cases (score > 100 -> cap a 100)
- [ ] Logs structures avec contexte (orderId, timestamp)
- [ ] Types generiques ou utility types
- [ ] Commits suivent Conventional Commits
- [ ] Questions pertinentes sur la spec

---

## Template de Feedback

```
## Feedback - [Nom du candidat]

### Score: XX/100

### Points forts
- ...

### Points a ameliorer
- ...

### Decision
[ ] Refuse
[ ] A discuter
[ ] Valide
[ ] Excellent

### Notes
...
```

---

## Resultats Attendus pour les Tests

**ORD-001 (client normal) :**
- Score: 0
- Level: low
- Flags: []

**ORD-002 (fraude potentielle) :**
- Score: 60 (25 + 20 + 15)
- Level: medium
- Flags: ["new_customer_high_amount", "high_risk_country", "crypto_payment"]

**Si le candidat obtient ces resultats, le fonctionnel est OK.**
