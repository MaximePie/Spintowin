import styled from 'styled-components';

export const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: repeat(auto-fill, 160px);
  grid-gap: 0.25rem;
  border-radius: 8px;
  
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Actions = styled.div`
    // Fixed position to the bottom right of the screen
    // Content is displayed in column
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 1rem;
    z-index: 1;


    // For phones, the actions are displayed in row
    @include for-phone-only {
      flex-direction: row;
      margin: 0.5rem;
    } 
`;
