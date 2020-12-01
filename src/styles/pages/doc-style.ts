import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-content: center;
  align-items: center;
  text-align: center;
  margin: auto;

  /* For pdf */
  .react-pdf__Page {
    scale: 2.5;
    margin: auto;
    align-content: center;
  }

  .react-pdf__Page__annotations.annotationLayer {
    padding: 20px;
  }

  .react-pdf__Page__canvas {
    margin: auto;
  }
`
