import { Store } from 'react-notifications-component';
// eslint-disable-next-line import/no-unresolved
import { iNotification } from 'react-notifications-component/dist/src/typings';

const baseNotification: iNotification = {
  insert: 'top',
  type: "success",
  container: 'top-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 2500,
    onScreen: true,
    pauseOnHover: true,
  },
  touchSlidingExit: {
    swipe: {
      duration: 250,
      timingFunction: 'ease-out',
      delay: 0,
    },
    fade: {
      duration: 250,
      timingFunction: 'ease-out',
      delay: 0,
    },
  },
};

// TYPES :
// success
// danger
// info
// default
// warning

export const levelUpNotification = {
  ...baseNotification,
  title: 'Level up ! ',
  message: 'Vous vous en sortez bien, continuez comme ça !',
  type: 'success',
};

export const CardSuccessNotification: iNotification = {
  ...baseNotification,
  title: 'Bravo !',
  message: "Votre carte a correctement été ajoutée ! Allez l'essayer !",
  type: 'success',
};

export const CategorySuccess: iNotification = {
  ...baseNotification,
  title: 'Bien !',
  message: 'Votre catégorie a correctement été ajoutée.',
  type: 'success',
};

export const addCardFailureNotification: iNotification = {
  ...baseNotification,
  title: 'Oups...',
  message: 'Il y a eu un problème lors de la création : ',
  type: 'warning',
};

export const systemErrorNotification: iNotification = {
  ...baseNotification,
  title: 'Aïe !',
  message: 'Il y a eu une erreur, sûrement un problème de configuration de la part du serveur. Nous allons corriger tout ça.',
  type: 'danger',
  dismiss: {
    duration: 7500,
    onScreen: true,
    pauseOnHover: true,
  },
};

export const streakNotification: iNotification = {
  ...baseNotification,
  title: 'Bravo !',
  type: 'success',
};

export const memorisedNotification: iNotification = {
  ...baseNotification,
  title: 'Félicitations !',
  type: 'success',
};

export const userPreferencesSavedNotification: iNotification = {
  ...baseNotification,
  title: 'OK !',
  message: "Vos préférences ont bien été sauvegardées",
  type: 'success',
};

export function addNotification(baseDetails: iNotification = baseNotification, isMobile = false) {
  const details = { ...baseDetails };
  if (isMobile) {
    details.insert = 'bottom';
  }
  Store.addNotification(details);
}
