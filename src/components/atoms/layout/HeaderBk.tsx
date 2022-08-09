import React from 'react'
import { css } from '@emotion/react'
import styled from "@emotion/styled";

export const Header = () => {
  
  return (
    <>
      <h1>ヘッダーです</h1>
      <SButton>FIGHT!</SButton>
    </>
  );
};

const SButton = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: #46cdcf;
    color: #fff;
    cursor: pointer;
  }
`;

export default Header;