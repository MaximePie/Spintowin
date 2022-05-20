/**
 * This file is made to locate and reuse all the CSS variables
 */

type directions = "row" | "column";
type flexPositioning = "center" | "baseline" | "space-around" | "space-between" | 'initial';
export function flex(
  direction: directions = "row",
  alignItems: flexPositioning = "center",
  justifyContent: flexPositioning = 'center',
) {
  return `
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    flex-direction: ${direction};
  `
}

const spacings = {
  oldMedium: '1rem',
  small: '0.25rem',
};

const shapes = {
  cardWidth: '180px',
  singleCardWidth: '340px',

  borders: {
    defaultBorderRadius: '8px',
    borderRadiusSmall: '4px',
    borderCard: 'solid 1px lightgray',
    radius: {
      small: '4px',
      medium: '8px',
    }
  },
};

export const cardStyle = `

  border-radius: ${shapes.borders.defaultBorderRadius};
  border: ${shapes.borders.borderCard};
  padding: ${spacings.oldMedium};
  cursor: pointer;

  // Centered
  ${flex};

  text-align: center;
`

const colors = {
  warning: '#eab000',
  primary: 'dodgerblue',
  primaryDisabled: '#6EBDFF',
  danger: '#ff6d46',
  success: '#00e396',
  gray: '#b5b5b5',
  grey: '#707070',
  white: '#fbfbfb'
};

export const modalContainer = `
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #00000080;
  width: 100vw;
  height: 100vh;
`;


export {
  colors, shapes, spacings,
};
