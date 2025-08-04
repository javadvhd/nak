import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { handleSignup } from "../logic/auth/auth.service";
import { SignupPayload } from "../logic/auth/auth.types";

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

const SigninLink = styled.button`
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

export const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<SignupPayload>();

  const password = watch("password");

  const onSubmit = async (data: SignupPayload) => {
    try {
      await handleSignup(data);
      navigate("/products");
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || t("auth.signup.error"),
      });
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{t("auth.signup.title")}</FormTitle>
        <FormFields>
          <Input
            label={t("auth.signup.name")}
            error={errors.name?.message}
            {...register("name", {
              required: t("auth.signup.nameRequired"),
            })}
          />
          <Input
            label={t("auth.signup.email")}
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: t("auth.signup.emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("auth.signup.emailInvalid"),
              },
            })}
          />
          <Input
            label={t("auth.signup.password")}
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: t("auth.signup.passwordRequired"),
              minLength: {
                value: 8,
                message: t("auth.signup.passwordMinLength"),
              },
            })}
          />
          <Input
            label={t("auth.signup.confirmPassword")}
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: t("auth.signup.passwordRequired"),
              validate: (value: string) =>
                value === password || t("auth.signup.passwordMismatch"),
            })}
          />
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            {t("auth.signup.submit")}
          </Button>
        </FormFields>
        <SigninLink onClick={() => navigate("/signin")}>
          {t("auth.signup.haveAccount")} {t("auth.signup.signIn")}
        </SigninLink>
      </FormContainer>
    </PageContainer>
  );
};
