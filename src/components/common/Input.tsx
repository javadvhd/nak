import { InputHTMLAttributes, forwardRef } from "react";
import styled from "@emotion/styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 500;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xxxl};
  border-radius: 40px;
  font-size: ${({ theme }) => theme.typography.variants.mediumSize.fontSize};
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  height: 70px;
  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : "none"};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.family};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.textSecondary};
  outline: none;
  transition: all 0.2s ease-in-out;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme, hasError }) =>
        hasError ? `${theme.colors.error}33` : `${theme.colors.primary}33`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, multiline, rows = 4, ...props }, ref) => {
    const InputComponent = multiline ? StyledTextArea : StyledInput;

    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputComponent
          ref={multiline ? undefined : ref}
          hasError={!!error}
          rows={multiline ? rows : undefined}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  }
);
