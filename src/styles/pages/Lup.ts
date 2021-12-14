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
  text-align: center;
  text-justify: inter-word;

  &::-webkit-scrollbar {
    width: opx;
  }

  .form {
    width: 80%;
    max-width: 950px;
    box-shadow: 5px 5px 15px 5px #000000;
    margin-top: 60px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  img {
    border-radius: 10px;
    max-width: 60%;
    max-height: 60%;
  }
  ul {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  strong {
    color: #ec8209;
  }
  .file-error {
    margin-top: 20%;
    justify-content: center;
    align-items: center;
  }
  .img-file-error {
    width: 200px;
    height: 200px;
  }

  .videoo {
    margin: 0px;
    padding: 10px;

    video {
      max-width: 60%;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-radius: 10px;
    }
  }
  .passos {
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
  }
  h2 {
    color: ${props => props.theme.colors.primary};
  }
  h5 {
    margin: 10px;
  }

  div {
    margin-top: 25px;
    justify-content: center;
    align-items: center;
  }

  button {
    display: block;
    min-width: 120px;
    border: none;
    background-color: #ec8209;
    color: white;
    border-radius: 5px;
    padding: 7px;
    cursor: pointer;
  }
  li {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 10px 5px;
    overflow: hidden;
  }
  a {
    color: ${props => props.theme.colors.primary};
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;
    padding: 0.5em;
  }

  input {
    width: 100%;
    height: 30px;
    display: block;
    padding: 7px;
    font-size: 16px;
    color: #ec8209;
    border-radius: 3px;
    border: 1px solid #ec8209;
    outline-color: #ec8209;
  }

  .page-obs {
    color: red;
  }
  .listagem {
    width: 90vw;
    max-height: 80%;
    overflow-y: auto;
  }
  .filtro {
    display: flex;
    width: 90vw;
    height: 20px;
    flex-direction: row;
    align-items: center;
  }

  .btn-go {
    width: 40px;
    height: 30px;
    margin-left: 2px;
    border-radius: 2px;
    min-width: 30px;
  }

  .btn-excluir {
    min-width: 50px;
    border: none;
    background-color: #ec8209;
    color: white;
    justify-content: right;
  }
  @media (max-width: 400px) {
    .form {
      width: 100%;
      height: 100%;
      box-shadow: 5px 5px 15px 5px #000000;
      margin-top: 60px;
      margin-bottom: 20px;
      border-radius: 10px;
    }

    .btn-excluir {
      display: none;
    }
    h1 {
      font-size: 48px;
    }

    .videoo {
      video {
        max-width: 85vw;
      }
    }
    img {
      max-width: 85vw;
    }
  }
`
