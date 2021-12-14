import styled from 'styled-components'
interface props {
  open: boolean
}
export const Ul = styled.ul<props>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    list-style: none;
    text-decoration: none;
    margin-right: 10px;
  }
  .link {
    text-decoration: none;
    display: block;
    padding: 20px 5px;
    color: #000000;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      margin-top: 2px;
      margin-right: 0px;
    }

    .link {
      padding-left: 15px;
      color: #ec8209;
      background-color: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(10px);
    }
    .avatar-view {
      display: flex;
      flex: 1;
      padding-left: 15px;
      padding-bottom: 10px;
      border-bottom: solid 1px;
    }
  }
`
export const StyledBurger = styled.div<props>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`
