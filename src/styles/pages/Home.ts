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

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }
`
