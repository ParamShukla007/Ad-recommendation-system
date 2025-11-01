import React from 'react';
import { styled } from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 6px solid black;
  padding: 20px 40px;
  margin-top: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 80px;
`;

const Title = styled.h1`
  margin: 0;
  color: black;
  font-size: 2.5rem;
  font-weight: 500;
  font-family: 'Times New Roman', Times, serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-feature-settings: "lnum";
  font-style: normal;
`;

const TryItNow = styled.span`
  color: black;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  &:after {
    content: ' →';
  }

  &:hover {
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: black;
      transition: width 0.3s ease;
    }
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Title>AD Reco</Title>
      <TryItNow>Try it now</TryItNow>
    </NavbarContainer>
  );
}

export default Navbar;