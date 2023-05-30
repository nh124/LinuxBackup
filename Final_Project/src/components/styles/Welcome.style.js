import styled from "styled-components";
// #374057
export const Welcome = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  padding: 10px;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const WelComeMessage = styled.label`
  color: white;
`;
