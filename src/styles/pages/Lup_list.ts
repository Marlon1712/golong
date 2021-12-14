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

  img {
    border-radius: 10px;
    max-width: 50vw;
    max-height: 50vh;
  }
  ul {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .videoo {
    margin: 0px;
    padding: 10px;

    video {
      max-width: 50vw;
      max-height: 50vh;
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

  div {
    margin-top: 25px;
    justify-content: center;
    align-items: center;
  }
  .comando {
    display: flex;
  }
  .comando-link {
    width: 100%;
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

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding: 10px 5px;
    border-top: solid 1px #ec8209;
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
  .footer {
    padding-top: 50px;
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
    margin: 3px;
    border: none;
    background-color: #ec8209;
    color: white;
    justify-content: right;
  }
  @media (max-width: 400px) {
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
