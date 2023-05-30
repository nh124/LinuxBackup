import styled from "styled-components";
// 56 x 58
export const Button = styled.button`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  background-color: ${(props) => props.color};
  z-index: 1;
`;

export const Text = styled.h3`
  color: ${(props) => props.color};
`;
