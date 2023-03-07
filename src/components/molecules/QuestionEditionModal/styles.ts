import styled from 'styled-components';
import { colors, flex, spacings } from '../../../style/StyledComponents/variables';

export const Form = styled.form`
  height: 80%;
  ${flex('column')};
`;

export const Fields = styled.div`
  ${flex('row', 'baseline', 'initial')};
`;

export const Field = styled.div`
  ${flex('column', 'baseline', 'initial')};
`;

export const Actions = styled.div`
  display: flex;
`;

// Display hints on the right side of the modal
export const Hints = styled.span`
  padding-left: ${spacings.medium};
  margin-left: ${spacings.medium};
  // Add a border on the left of the hints
  border-left: 1px solid ${colors.grey};
  height: 100%;
`;
