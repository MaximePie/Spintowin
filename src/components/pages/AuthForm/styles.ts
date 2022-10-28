import styled from 'styled-components';
import {
  cardStyle, colors, shapes, spacings,
} from '../../../style/StyledComponents/variables';

export const Container = styled.div`
  .AuthForm-container {
    // Screen size - Nav bar height - padding top - Navbar padding
    height: calc(100vh - ${shapes.navbarHeight} - 8rem - 1rem);
  }`;

export const StyledForm = styled.form`
  ${cardStyle};
  margin: ${spacings.extraLarge} auto;
  width: 300px;
`;

export const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin: 1rem 0;
`;

export const Label = styled.label`
  text-align: left;
  display: inline-block;
  font-size: 0.8em;
`;

export const Action = styled.button`
  margin-top: ${spacings.medium};
  text-transform: uppercase;
  width: 80%;
`;

export const Redirection = styled.div`

  margin-top: ${spacings.extraLarge};
  color: ${colors.gray}
`;
