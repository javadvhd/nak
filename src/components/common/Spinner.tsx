import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface SpinnerProps {
  size?: number;
  color?: string;
  centered?: boolean;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ centered?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ centered }) =>
    centered &&
    `
    width: 100%;
    height: 100%;
    min-height: 200px;
  `}
`;

const SpinnerCircle = styled.div<{ size: number; color?: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => Math.max(2, size / 8)}px solid
    ${({ theme }) => theme.colors.background};
  border-top-color: ${({ theme, color }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Spinner = ({
  size = 40,
  color,
  centered = true,
}: SpinnerProps) => {
  return (
    <SpinnerContainer centered={centered}>
      <SpinnerCircle size={size} color={color} />
    </SpinnerContainer>
  );
};
