import React from 'react';
import { styled } from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px 40px;
  margin-top: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 80px;
  border-bottom: 2px solid black;
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

function Navbar() {
  return (
    <NavbarContainer>
      <Title>AD Reco</Title>
    </NavbarContainer>
  );
}

export default Navbar;