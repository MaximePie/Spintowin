import styled from "styled-components";
import {flex, shapes, spacings} from "../../../style/StyledComponents/variables";
import {StyledButtonProps, StyledCardProps} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../atoms/Button/Button";

export const Container = styled.div`
  
  &.Card--answerShown-enter, &.Card--answerShown-enter-active {
    opacity: 0.01;
    transform: rotateY(90deg);
  }

  &.Card--answerShown-enter-done {
    opacity: 1;
    transition: opacity 300ms, transform 300ms;
    transform: rotateY(0);
  }
`

export const StyledCard = styled.div<StyledCardProps>`
  position: relative;

  overflow: hidden;
  border-radius: ${shapes.borders.radius.medium};

  width: ${width};
  height: ${height};
  font-size: ${fontSize};


  @media (max-width: 1200px) {
    width: ${(props) => width(props, true)};
  }

  border: ${border};
  margin: 0.25rem;
  cursor: pointer;
  
  ${flex('column')}

  font-weight: bold;

  text-align: center;
`

export const Delay = styled.div`
  font-weight: initial;
  margin: ${spacings.small} ${spacings.medium};
`

export const Image = styled.img<StyledCardProps>`
  height: ${imageHeight};
  width: ${imageWidth};
`

export const Content = styled.p<StyledCardProps>`
  margin-bottom: 0;
  font-weight: 500;
  max-height: 80%;
  overflow: auto;
  margin-top: ${({isSingle}) => isSingle && spacings.small}};
`


export const Edit = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${spacings.small};
  left: ${spacings.small};
  outline: none;
  border: none;
`

export const StyledButton = styled(Button)<StyledButtonProps>`
  margin: ${spacings.small} 0 ${spacings.small} ${({isFailed}) => isFailed ? spacings.small : 0};
`

function border({noBorders}: StyledCardProps) {
  return noBorders ? '' : 'solid 1px lightgray';
}

function fontSize({isSingle}: StyledCardProps) {
  return `${isSingle ? 2 : 1.1}em`
}

function width({isSingle}: StyledCardProps, isPhone = false) {
  const multipleCardsWidth = isPhone ? '170' : '180';
  return `${isSingle ? 340 : multipleCardsWidth}px`
}

function height({isSingle}: StyledCardProps) {
  return `${isSingle ? 480 : 150}px`
}

function imageWidth({isSingle}: StyledCardProps) {
  return isSingle ? '100%' : '180px';
}

function imageHeight({isSingle}: StyledCardProps) {
  return isSingle ? '100%' : '180px';
}