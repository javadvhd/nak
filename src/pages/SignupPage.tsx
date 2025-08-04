import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { handleSignup } from "../logic/auth/auth.service";
import { SignupPagePayload } from "../logic/auth/auth.types";
import { ArrowRightIcon } from "../assets/icons/arrow-right";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.appBackground};
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.pageBackground};
  padding: ${({ theme }) => theme.spacing.xxxl};
  border-radius: 40px;
  width: 100%;
  max-width: 700px;
`;

const FormTitle = styled.h1`
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.variants.biggestSize.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.variants.biggestSize.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.variants.biggestSize.lineHeight};
`;

const FormFields = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
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

const AnimatedArrow = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  height: 100%;
  align-self: center;
  &:hover {
    transform: translateX(10px);
  }
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
  } = useForm<SignupPagePayload>();

  const password = watch("password");

  const onSubmit = async ({ confirmPassword, ...data }: SignupPagePayload) => {
    try {
      await handleSignup({ ...data });
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
            placeholder={t("auth.signup.name")}
            error={errors.firstName?.message}
            {...register("firstName", {
              required: t("auth.signup.nameRequired"),
            })}
          />
          <Input
            placeholder={t("auth.signup.lastName")}
            error={errors.lastName?.message}
            {...register("lastName", {
              required: t("auth.signup.lastNameRequired"),
            })}
          />
          <Input
            placeholder={t("auth.signup.username")}
            error={errors.userName?.message}
            {...register("userName", {
              required: t("auth.signup.usernameRequired"),
            })}
          />
          <Input
            placeholder={t("auth.signup.password")}
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
            placeholder={t("auth.signup.confirmPassword")}
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: t("auth.signup.passwordRequired"),
              validate: (value: string) =>
                value === password || t("auth.signup.passwordMismatch"),
            })}
          />
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
        </FormFields>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "70px",
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/signin")}>
            {t("auth.signup.signIn")}
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            <AnimatedArrow>
              <ArrowRightIcon />
            </AnimatedArrow>
          </Button>
        </div>
      </FormContainer>
    </PageContainer>
  );
};
