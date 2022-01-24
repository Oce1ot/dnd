import styled from "styled-components";

export const RootNode = styled.div`
  display: flex;
  align-items: center;
  padding-inline-end: 8px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(66, 66, 66, 0.12);
  border-radius: 12px;
  padding: 15px;
  position: relative;
  z-index: 20;

  &::after,
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
  }

  &::before {
    height: calc(100vh * 5);
    width: 2px;
    background: #d4d4d4;
    left: ${({ indent }) => `calc((${indent}px - 25px) - ${indent}px)`};
    top: -50%;
    transform: translateY(-99%);
    display: ${({ indent }) => (indent === 0 ? "none" : "block")};
  }

  &::after {
    width: 48px;
    height: 100%;
    left: ${({ indent }) => `calc((${indent}px - 48px) - ${indent}px)`};
    top: 50%;
    transform: translateY(-50%);
    display: ${({ indent }) => (indent === 0 ? "none" : "block")};
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_201_5219)'%3E%3Cpath d='M24 3.05176e-05V16C24 20.4183 27.5817 24 32 24H48' stroke='%23D4D4D4' stroke-width='2' stroke-linecap='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_201_5219'%3E%3Crect width='48' height='48' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
  }
`;
