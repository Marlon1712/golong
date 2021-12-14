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
    margin-top: 60px;
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
  }

`