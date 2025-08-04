import { SelectHTMLAttributes, forwardRef } from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  fullWidth?: boolean;
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

const StyledSelect = styled.select<{ hasError?: boolean }>`
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
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.spacing.sm} center;
  background-size: 1em;
  padding-right: ${({ theme }) => theme.spacing.xl};

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
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, fullWidth = true, ...props }, ref) => {
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <StyledSelect ref={ref} hasError={!!error} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  }
);
