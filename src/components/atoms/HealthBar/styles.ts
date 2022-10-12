import styled from 'styled-components';

export const StyledHealthBar = styled.div``;

type BarProps = {
  currentHealth: number;
}

// A small progress bar component that displays the current health of a character
export const Bar = styled.div<BarProps>`
  height: 10px;
  width: ${(props) => props.currentHealth}%;
  background-color: #e0e0e0;
  border-radius: 5px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #4caf50;
    border-radius: 5px;
    transition: width 0.5s ease;
  }
  
  
`;
