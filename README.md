# Habit Tracker

Application de suivi d’habitudes en français, construite avec React 18, TypeScript et Create React App. Les données sont conservées dans le navigateur, sans compte ni backend.

## Développement

Node 24.19.0 et npm 11.9.0 ont été vérifiés dans l’environnement cloud.

```sh
npm ci
npm start
```

## Validation

```sh
npm run build
npx tsc --noEmit
npx eslint src --max-warnings 0
CI=true npm test -- --watchAll=false --runInBand
```

## Fonctionnalités

- Ajout, édition, mise en pause et suppression avec confirmation.
- Suivi par jour, semaine du lundi au dimanche ou mois, avec dates locales.
- Recherche, catégories et statistiques sur les habitudes actives filtrées.
- Export JSON et import avec validation, fusion par identifiant.
- Protection contre les erreurs de stockage. Une restauration par import conserve les anciennes données illisibles sous la clé locale `habits-recovery-backup` avant remplacement.
- Rappels facultatifs avec autorisation explicite. L’application doit rester ouverte ; ce ne sont pas des notifications en arrière-plan.
- Interface responsive, contrôles clavier, focus visible et annonces des actions.

## Structure

`src/domain` contient les types, validations et opérations de dates. `src/hooks` gère la persistance et les rappels. `src/components` contient les formulaires, le suivi, les statistiques et les paramètres. Les tokens visuels sont définis dans `src/index.css`.

## Limites

Les données ne sont pas synchronisées entre appareils ou onglets : évitez les modifications simultanées dans plusieurs onglets et exportez une sauvegarde avant de vider le navigateur. Create React App produit encore des avertissements de dépendances anciennes. La configuration Capacitor est conservée ; les builds natifs Android et iOS ne sont pas validés.
