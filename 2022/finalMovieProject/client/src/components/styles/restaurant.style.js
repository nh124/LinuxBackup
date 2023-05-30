import styled from "styled-components";
// 56 x 58
export const Image = styled.img`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border: ${(props) => props.border}
  z-index: 1;
`;  

export const RestLabel = styled.label`
  color: ${(props) => props.color}
  font-size: ${(props) => props.size}
  text-align: center;
`;