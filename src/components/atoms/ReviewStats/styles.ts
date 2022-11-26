import styled from 'styled-components';

export const StyledReviewStats = styled.div`
  // 2 rows size
  grid-row: 1 / 3;
  overflow: hidden;
  border-radius: 8px;
  width: 180px;
  height: 310px;
  border: solid 1px lightgray;
  margin: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-weight: bold;
  font-size: 1.1em;

  text-align: center;

@include for-phone-only {
  width: 170px;

  &--isSingle {
    width: 240px;
    height: 340px;
  }
}
`;
