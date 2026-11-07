// src/templates/saas/(seoghost)/_i18n/fr.ts
import type { Messages } from './messages';

export const fr: Messages = {
  dateLocale: 'fr-FR',

  badge: 'Blog',
  title: 'Articles & Ressources',
  description: 'Guides pratiques, astuces et actualités pour tirer le meilleur de ce que nous proposons.',
  metaTitle: 'Blog',

  readMoreLabel: "Lire l'article",
  minRead: 'min de lecture',
  backToBlog: 'Tous les articles',
  onThisPage: 'Dans cet article',
  keepReading: 'À lire aussi',
  featuredTitle: 'À la une',
  latestTitle: 'Les derniers articles',
  defaultCategory: 'Général',
  tagPageTitle: (tag) => tag,
  tagPageDescription: (tag) => `Tous nos articles sur le thème « ${tag} ».`,
  photoBy: 'Photo de',
  on: 'sur',
  previous: 'Précédent',
  next: 'Suivant',

  emptyTitle: "Pas encore d'articles",
  emptyDescription: 'Les nouveaux articles apparaîtront ici dès leur publication.',
  notFoundTitle: 'Page introuvable',
  notFoundDescription: "Cet article n'existe pas ou n'est plus disponible.",
  errorTitle: "Une erreur s'est produite",
  errorDescription: 'Impossible de charger le blog pour le moment. Réessayez dans un instant.',
  retry: 'Réessayer',

  ctaTitle: 'Prêt à vous lancer ?',
  ctaDescription: 'Découvrez comment ça marche et essayez par vous-même.',

  poweredBy: 'Blog créé en pilote automatique avec SEOGhost',

  home: 'Accueil',
  hubDescription: 'Choisissez la page qui correspond à votre situation.',
  updated: 'Mis à jour le',
  faq: 'Questions fréquentes',
  reviewsTitle: 'Ce que disent nos clients',
  offersTitle: 'Choisissez votre formule',
  choosePlan: 'Choisir cette formule',
  highlightedPlan: 'Le plus choisi',
  galleryTitle: 'En images',
  watchVideo: 'Voir la vidéo',
  howItWorks: 'Comment ça marche',

  newsletterTitle: 'Abonnez-vous à notre newsletter',
  newsletterDescription: 'Recevez nos derniers articles directement dans votre boîte mail.',
  emailLabel: 'Adresse email',
  emailPlaceholder: 'Votre adresse email',
  subscribe: "S'abonner",
  subscribing: 'Inscription…',
  subscribeSuccess: 'Merci, vous êtes bien abonné !',
  subscribeInvalid: 'Veuillez saisir une adresse email valide.',
  subscribeError: "Une erreur s'est produite. Veuillez réessayer.",
  subscribePreviewNotice: "L'inscription est désactivée dans la prévisualisation.",
};
