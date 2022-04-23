import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = PropsWithChildren<{}>;

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function ModalWrapper({ children }: Props) {
  return (
    <Div>
      ModalWrapper
      {children}
    </Div>
  );
}
