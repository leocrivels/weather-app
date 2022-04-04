import styled, { css } from 'styled-components';

interface ButtonProps {
  primary?: true;
}

export const Button = styled.button`background: #EB9486;
  border-radius: 100px;
  border: 2px solid #EB9486;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  font-size: 14px;
  @media (min-width: 769px) {
    font-size: 2vw;
  }
  ${(props: ButtonProps) => props.primary && css`background: transparent;
  color: #EB9486;`}
  
`;

export const FlexCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToolBarWrapper = styled.nav` 
  font-weight: bold;
  color: #F3DE8A;
  position: sticky;
  top: 0;
  z-index: 2000;
  height: 80px;
  background-color: #272838;
  padding: 0px 12px !important;
  /* box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5); */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4em;
  @media (min-width: 1024px) {
    font-size: 2vw;
  }
`;

export const Input = styled.input`
border-radius: 100px;
background-color: #F3DE8A;
border-color: #F3DE8A;
font-size: 1.2em;
padding: 0.25em 0.75em;
@media (min-width: 1024px) {
  font-size: 2vw;
}`;

export const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  text-justify: center;
  font-weight: bold;
  color: #F3DE8A;
  border-radius: 10px;
  background-color: #272838;
  //border: 2px solid #EB9486;
  margin: 0.5em 1em;
  padding: 0.25em 1.75em;
`;

export const Select = styled.select`
    font-size: 1em;
    padding: 5px;
    margin: 10px;
    margin-top: 20px;
    margin-bottom: 0px;
  `;

export const Error = styled.div`
  background-color: red;
  color: white;
  text-align: center;
  padding: 2px 0px;
`;

export const Warning = styled.div`
  background-color: yellow;
  color: black;
  text-align: center;
  padding: 2px 0px;
`;

export const IdleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 77vh;
  font-size: 4vh;
  padding: 2vh;
  text-align: center;
  color: grey;
`;