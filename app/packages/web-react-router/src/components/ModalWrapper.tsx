import { PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Wrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff8;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export function ModalWrapper({ children, className }: Props) {
  return (
    <Wrapper>
      <div className={className}>{children}</div>
    </Wrapper>
  );
}
