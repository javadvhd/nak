import { ButtonHTMLAttributes, forwardRef } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  color?: "black" | "transparent" | "error";
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, size = "medium" }) => {
    switch (size) {
      case "small":
        return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case "large":
        return `0px ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  font-size: ${({ theme, size = "medium" }) => {
    switch (size) {
      case "small":
        return theme.typography.sizes.sm;
      case "large":
        return theme.typography.sizes.lg;
      default:
        return theme.typography.sizes.md;
    }
  }};
  font-weight: 500;
  border-radius: 10000px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  min-width: 120px;
  position: relative;

  ${({ variant = "contained", theme }) => {
    switch (variant) {
      case "contained":
        return `
          background-color: ${theme.colors.black};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.black}dd;
          }
          &:active:not(:disabled) {
            background-color: ${theme.colors.black}bb;
          }
        `;
      case "outlined":
        return `
          border: 1px solid ${theme.colors.black};
          background-color: transparent;
          color: ${theme.colors.black};
          &:hover:not(:disabled) {
            background-color: transparent;
          }
          &:active:not(:disabled) {
            background-color: transparent;
          }
        `;
      case "text":
        return `
        border: none;  
        background-color: transparent;
          color: ${theme.colors.black};
          &:hover:not(:disabled) {
            background-color: transparent;
          }
          &:active:not(:disabled) {
            background-color: transparent;
          }
        `;
      default:
        return "";
    }
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, disabled, ...props }, ref) => {
    return (
      <StyledButton ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading && <Spinner />}
        {children}
      </StyledButton>
    );
  }
);
