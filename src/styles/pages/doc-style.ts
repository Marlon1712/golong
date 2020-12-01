import styled from 'styled-components'
import WebViewer from '@pdftron/webviewer'
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 60px;
    padding: 8px 8px 8px 16px;
    box-sizing: border-box;
    background: #00a5e4;
    font-size: 1.2em;
    line-height: 44px;
    color: white;
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }
`
