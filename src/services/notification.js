import { store } from 'react-notifications-component';

const baseNotification = {
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
    pauseOnHover: true,
  },
  touchSlidingExit: {
    swipe: {
      duration: 400,
      timingFunction: 'ease-out',
      delay: 0,
    },
    fade: {
      duration: 400,
      timingFunction: 'ease-out',
      delay: 0
    }
  }
}

// TYPES :
// success
// danger
// info
// default
// warning

export const levelUpNotification = {
  ...baseNotification,
  title: "Level up ! ",
  message: "Vous vous en sortez bien, continuez comme ça !",
  type: "success",
}

export const addCardSuccessNotification = {
  ...baseNotification,
  title: "Bravo !",
  message: "Votre carte a correctement été ajoutée ! Allez l'essayer !",
  type: "success",
}


export const addCardFailureNotification = {
  ...baseNotification,
  title: "Oups...",
  message: "Il y a eu un problème lors de la création : ",
  type: "warning",
};

export const streakNotification = {
  ...baseNotification,
  title: "Bravo !",
  type: "success",
};


export function addNotification(details, isMobile = false) {
  let notification = details;
  if (isMobile) {
    notification.insert = "bottom";
  }
  store.addNotification(details);
}
