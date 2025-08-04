import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { handleLogin } from "../logic/auth/auth.service";
import { LoginPayload } from "../logic/auth/auth.types";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: 600;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SignupLink = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.family};

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
  display: block;
`;

export const SigninPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    try {
      await handleLogin(data);
      navigate("/products");
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || t("auth.signin.error"),
      });
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{t("auth.signin.title")}</FormTitle>
        <FormFields>
          <Input
            label={t("auth.signin.email")}
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: t("auth.signin.emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("auth.signin.emailInvalid"),
              },
            })}
          />
          <Input
            label={t("auth.signin.password")}
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: t("auth.signin.passwordRequired"),
              minLength: {
                value: 8,
                message: t("auth.signin.passwordMinLength"),
              },
            })}
          />
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            {t("auth.signin.submit")}
          </Button>
        </FormFields>
        <SignupLink onClick={() => navigate("/signup")}>
          {t("auth.signin.noAccount")} {t("auth.signin.signUp")}
        </SignupLink>
      </FormContainer>
    </PageContainer>
  );
};
