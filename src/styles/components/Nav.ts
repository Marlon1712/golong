import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 40px;
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }
`
export const Nav = styled.nav`
  background-color: #ec8209;
  width: 100%;
  height: 55px;
  box-shadow: 0px 0px 3px 3px #ccc;
  padding: 0 20px;
  display: flex;
  position: fixed;
  z-index: 999;
  justify-content: space-between;
  align-items: center;

  .logo {
    padding: 15px 0;
    font-weight: bold;
    font-size: 22px;
  }
  .links {
    text-decoration: none;
    display: block;
    padding: 15px 0;
    font-weight: bold;
    font-size: 22px;
    color: #000000;
  }
`
