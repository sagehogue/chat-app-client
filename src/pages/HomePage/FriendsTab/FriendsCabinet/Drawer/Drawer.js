import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import styled from "styled-components";

const DrawerFrame = styled.div`
  transition: all 0.5s;
  background-color: rgba(211, 211, 211, 0.35);
  // original background-color: #c78989;
  max-height: ${(props) => (props.isOpen ? "40vh" : "2.5rem")};
  overflow: hidden;
  cursor: pointer;
  padding: 0 0.75rem 0.75rem 0.75rem;
  &:nth-child(odd) {
    background-color: rgba(211, 211, 211, 0.65);
    // original background-color: #edcece;
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
  z-index: 5;
  padding: 0.2rem;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s;
  &:hover {
    font-weight: 500;
    scale: 1.1;
  }
`;

const Contents = styled.div`
  z-index: 4;
`;

const Triangle = styled(GoTriangleDown)`
  transition: all 0.3s;
  transform: rotate(${(props) => (props.isOpen ? "180" : "0")}deg);
`;

export default function Drawer({ name, children }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = () => setDrawerIsOpen(true);
  const closeDrawer = () => setDrawerIsOpen(false);
  return (
    <DrawerFrame isOpen={drawerIsOpen}>
      <Label
        onClick={() => {
          if (drawerIsOpen) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }}
      >
        <div>{name}</div>
        <Triangle isOpen={drawerIsOpen} />
      </Label>
      <Contents isOpen={drawerIsOpen}>{children}</Contents>
    </DrawerFrame>
  );
}
