# Fraud Detection Exercise

Exercice technique de 90 minutes - Implémentation d'un worker de scoring de fraude.

## Quick Start

```bash
# 1. Lancer Redis
docker-compose up -d

# 2. Installer les dépendances
npm install

# 3. Lancer le worker (après implémentation)
npm run dev

# 4. Trigger des commandes de test
npm run trigger-order

# 5. Lancer les tests
npm test
```

## Instructions

Voir **SPEC_EXERCICE.md** pour les instructions completes.

---

## Soumettre ton travail

### Option A : Fork + Pull Request (recommande)

1. **Fork** ce repo sur ton compte GitHub
2. Clone ton fork :
   ```bash
   git clone https://github.com/<ton-username>/fraud-detection-exercise.git
   ```
3. Cree une branche pour ton travail :
   ```bash
   git checkout -b feat/risk-scoring-worker
   ```
4. Code, commit regulierement (commits atomiques)
5. Push ta branche :
   ```bash
   git push origin feat/risk-scoring-worker
   ```
6. Cree une **Pull Request** sur ton fork
7. Envoie le lien de ta PR par email

### Option B : Acces collaborateur

Si on t'a ajoute comme collaborateur sur ce repo :

1. Clone directement :
   ```bash
   git clone https://github.com/mathysbarrie/fraud-detection-exercise.git
   ```
2. Cree ta branche :
   ```bash
   git checkout -b feat/risk-scoring-worker-<ton-prenom>
   ```
3. Code, commit, push
4. Cree une **Pull Request** vers `main`

---

## Livrables attendus

- [ ] `PLAN.md` complete (avant de coder)
- [ ] `src/services/risk-scoring.service.ts` implemente
- [ ] `src/workers/risk-scoring.worker.ts` implemente
- [ ] `tests/risk-scoring.test.ts` avec minimum 5 tests
- [ ] Commits atomiques avec messages clairs
- [ ] PR avec description (What/Why/How)
