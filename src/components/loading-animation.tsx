import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: -3;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .circle {
    width: 100px;
    height: 100px;
    position: absolute;
    transform-origin: 50%;
    animation: circle 1s linear infinite forwards;
  }
  @keyframes circle {
    to {
      transform: rotate(360deg);
    }
  }
`
const Loading: React.FC = () => {
  return (
    <Container>
      <img className="circle" src="/skol.svg" alt="Loading" />
    </Container>
  )
}

export default Loading
