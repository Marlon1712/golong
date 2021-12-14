import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    padding: 2px 0 10px 0;
    font-family: Arial, sans-serif;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  form {
    box-sizing: border-box;
    background-color: white;
    box-shadow: 5px 5px 15px 5px #000000;
    margin-top: 60px;
    width: 80%;
    max-width: 950px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 5px;
    overflow: hidden;
    overflow-y: auto;
    animation: fade 500ms;
  }

  form::-webkit-scrollbar {
    width: 0px;
  }

  .cabecalho {
    display: block;
  }

  .view-input {
    display: inline-blockç;
    flex-direction: column;
    justify-content: center;
    .img-container {
      width: 100%;
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      align-items: center;
      justify-content: center;

      img {
        width: 50%;
        height: 50%;
        border-radius: 10px;
      }
      video {
        width: 50%;
        height: 50%;
        border-radius: 10px;
      }
    }
  }

  input {
    width: 100%;
    display: block;
    font-size: 16px;
    font-family: Arial, sans-serif;
    color: #ec8209;
    border-radius: 3px;
    outline-color: #ec8209;
    transition: all 0.2s;
    touch-action: manipulation;
  }

  .obs {
    height: 50px;
  }
  .passos {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
  }

  li {
    list-style: none;
  }

  div {
    flex-direction: column;
    &:nth-child(1) {
      animation: move 500ms;
    }
    &:nth-child(2) {
      animation: move 500ms;
      animation-delay: 100ms;
    }
    &:nth-child(3) {
      animation: move 500ms;
      animation-delay: 250ms;
    }
  }

  label {
    color: #405c60;
    margin-left: 0px;
    transition: all 0.2s;
    touch-action: manipulation;
  }

  span {
    color: red;
  }

  .btns {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .submit-passo {
    display: block;
    min-width: 120px;
    border: none;
    background-color: #ec8209;
    color: white;
    border-radius: 5px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    padding: 7px;
    animation: move 500ms;
    animation-delay: 300ms;
    animation-fill-mode: backwards;
  }

  .add-passo {
    display: flex;
    min-width: 100px;
    border: none;
    background-color: #ec8209;
    color: #ffffff;
    border-radius: 5px;
    justify-content: center;
    padding: 7px;
    animation: move 500ms;
    animation-delay: 300ms;
    animation-fill-mode: backwards;
  }
  .excluir-passo {
    display: flex;
    min-width: 100px;
    border: none;
    background-color: #ec8209;
    color: #ffffff;
    border-radius: 5px;
    justify-content: center;
    padding: 7px;
    animation: move 500ms;
    animation-delay: 300ms;
    animation-fill-mode: backwards;
  }
  .img-preview {
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .btn:focus {
    outline: none;
    box-shadow: none;
  }

  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: 'Select file';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes move {
    from {
      opacity: 0;
      transform: translateX(-35%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  .validade-error {
    animation: nono 500ms;
  }
  @keyframes nono {
    0%,
    100% {
      opacity: 0;
      transform: translateX(0);
    }
    35% {
      opacity: 1;
      transform: translateX(-15%);
    }
    70% {
      opacity: 1;
      transform: translateX(15%);
    }
  }

  @media (max-width: 800px) {
    .img-container {
      img {
        width: 70%;
        height: auto;
        border-radius: 10px;
      }
      video {
        width: 70%;
        height: 50%;
        border-radius: 10px;
      }
    }
    form {
      width: 90vw;
      margin-top: 60px;
    }
    h1 {
      font-size: 32px;
    }
    input {
      font-size: 12px;
    }
    textarea {
      font-size: 12px;
    }
    label {
      font-size: 14px;
    }
  }
`

const padding = '10px'
const labelFontSize = '16px'
export const Imputt = styled.div`
  .control {
    float: left;
    position: relative;
    width: 100%;
    padding-top: ${padding} + ${labelFontSize};
    padding-bottom: ${padding};

    // you proably want to replace these with your grid classes
    &.small {
      width: 30%;
    }

    &.medium {
      width: 70%;
      padding-left: ${padding};
    }

    &:last-child {
      border: 0;
    }
  }
  textarea {
    width: 100%;
    height: 40px;
    display: block;
    font-size: 16px;
    resize: none;
    font-family: Arial, sans-serif;
    color: #ec8209;
    border: none;
    border-bottom: 1px solid #ccddef;
    outline: #ec8209;
    padding: 7px;

    &::-webkit-scrollbar {
      width: 0px;
    }

    // inactive but shown label (exceptions: opacity and top)
    &:not(:placeholder-shown) {
      padding-top: 20px;
      transition: top 0.5s ease, opacity 0.5s ease;
      border-bottom: 2px solid #ec8209;
    }
    & + label {
      position: absolute;
      margin-left: 7px;
      top: 10px;
      transition: top 0.5s ease, opacity 0.5s ease;
      opacity: 0;

      // Some nice styling
      font-size: ${labelFontSize};
      font-weight: 600;
      color: #ec8209;
    }

    // THE MAGIC
    // as soon as we start typing, the "required" attribute will
    // set the state to valid and our pseudo selector will match
    &:valid + label {
      opacity: 1;
      top: 3px;
    }

    // and we highlight the focused input label
    &:focus + label {
      color: #ec8209;
    }
  }
`
