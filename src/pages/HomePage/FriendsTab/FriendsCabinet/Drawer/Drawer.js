import React from "react";
import { GoTriangleDown } from "react-icons/go";
import styled from "styled-components";

const DrawerFrame = styled.div`
  background-color: #c78989;
  &:nth-child(odd) {
    background-color: #edcece;
  }
`;
const Label = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f0f0f0;
`;
const Contents = styled.div``;
export default function Drawer({ name, children }) {
  return (
    <DrawerFrame>
      <Label>
        <div>{name}</div>
        <GoTriangleDown />
      </Label>
      <Contents>{children}</Contents>
    </DrawerFrame>
  );
}
