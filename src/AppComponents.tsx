import styled from "styled-components";

export const Button = styled.button`
  appearance: none;
  outline: none;
  border: none;
  background: linear-gradient(25deg, #ed113d, #fa9e1e);
  height: 60px;
  line-height: 60px;
  width: 150px;
  color: white;
  font-weight: 500;
  font-size: 1.5rem;
  filter: drop-shadow(0px 1px 5px rgb(138, 138, 138));
  transform: translateZ(0); // Enable GPU rendering on iOS devices
  transition: 0.3s;
  border-radius: 5px;

  &:hover {
    filter: drop-shadow(0px 1px 10px rgb(79, 79, 79));
    background-position: right center;
  }

  &:active {
    filter: none;
  }
`;

export const PositioningButton = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 30px;
`;

export const ConditionInputPanel = styled.div`
  filter: drop-shadow(0px 0px 6px rgb(43, 43, 43));
  transform: translateZ(0); // Enable GPU rendering on iOS devices
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
  min-height: 500px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  margin: auto;

  .react-autosuggest__container {
    padding: 0;
    display: flex;
    justify-content: center;
    align-item: center;
  }

  .react-autosuggest__input--focused {
    border: none;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.6);
    top: 337px;
    font-weight: 300;
    font-size: 16px;
    width: 600px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 1.15rem;
  margin-top: 20px;
  margin-bottom: 0px;
  color: #333333;
`;

export const BookingContainer = styled.div`
  background: url(https://cdn.pixabay.com/photo/2019/05/27/22/57/planner-4233907_1280.jpg)
    no-repeat center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: relative;

  ::before {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: " ";
  }
`;

export const HeadTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  color: #1c1c1c;
`;
