import styled, { css } from "styled-components";

interface WeatherFrameProps {
  current?: true;
}
export const WeatherFrame = styled.div`
  align-self: flex-start;
  margin: 0px 5px;
  box-shadow: black -1px 1px 3px 1px;
  border: solid;
  padding: 4px;
  text-align: center;
  background-color: white;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (min-width: 769px) {
    height: 95%;
    align-self: center;
  }
  @media (max-width: 769px) {
    align-self: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  ${(props: WeatherFrameProps) =>
    props.current &&
    css`
      @media (max-width: 769px) {
        width: 95%;
      }
      box-shadow: black 0px 0px 0px 0px;
    `};
`;

export const MainWeather = styled.div`
  width: 100%;
  height: 60vh;
  border: solid;
  display: flex;
  box-shadow: black -1px 1px 10px 1px;
  @media (min-width: 769px) {
    align-items: center;
  }
  @media (max-width: 769px) {
    justify-content: center;
    width: 99%;
    height: 100%;
    flex-direction: column;
  }
`;

export const SummaryOffset = styled.div`
  padding: 0px 4px 10px 4px;
  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    padding-left: 10%;
  }
`;

export const ForecastList = styled.ol`
  display: flex;
  overflow-x: scroll;
  list-style-type: none;
  padding-bottom: 10px;
  padding-left: 10px;
`;
