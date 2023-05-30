import styled from "styled-components";
// 56 x 58
export const GroupTab = styled.button`
  width: 500px;
  height: 100px;
  left: 10px;
  top: ${(props) => props.top};
  background-color: ${(props) => props.color};
  z-index: 1;
`;

export const Labels = styled.h3`
  font-weight: bold;
  position: absolute;
`;
