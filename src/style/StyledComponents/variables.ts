/**
 * This file is made to locate and reuse all the CSS variables
 */

const flex = `
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const spacings = {
  mediumSpacing: '8px',
  defaultSpacing: '1rem',
};

const shapes = {
  cardWidth: '180px',
  singleCardWidth: '340px',

  borders: {
    defaultBorderRadius: '8px',
    borderRadiusSmall: '4px',
    borderCard: 'solid 1px lightgray',
  },
};

const colors = {
  navbarHeight: '40px',

  warning: '#eab000 !default',
  primaryColor: 'dodgerblue',
  primaryColorDisabled: '#6EBDFF',
  dangerColor: '#ff6d46',
  successColor: '#00e396',
  gray: '#b5b5b5',
};

export {
  flex, colors, shapes, spacings,
};
