import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { handleLogin } from "../logic/auth/auth.service";
import { LoginPayload } from "../logic/auth/auth.types";
import { ArrowRightIcon } from "../assets/icons/arrow-right";

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

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.appBackground};
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.pageBackground};
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: 40px;
  width: 100%;
  max-width: 700px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 40px;
`;

const FormTitle = styled.h1`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.variants.biggestSize.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.variants.biggestSize.fontWeight};
  line-height: ${({ theme }) =>
    theme.typography.variants.biggestSize.lineHeight};
  text-align: left;
`;

const FormFields = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.variants.body2.fontSize};
  text-align: center;
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
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
      navigate("/attributes");
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
            type="text"
            error={errors.userName?.message}
            {...register("userName", {
              required: t("auth.signin.usernameRequired"),
            })}
            placeholder={t("auth.signin.username")}
          />
          <Input
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: t("auth.signin.passwordRequired"),
              minLength: {
                value: 8,
                message: t("auth.signin.passwordMinLength"),
              },
            })}
            placeholder={t("auth.signin.password")}
          />
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
        </FormFields>
        <ButtonContainer>
          <Button variant="outlined" onClick={() => navigate("/signup")}>
            {t("auth.signin.signUp")}
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            <AnimatedArrow>
              <ArrowRightIcon />
            </AnimatedArrow>
          </Button>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};
