import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Spinner } from "../../components/common/Spinner";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../logic/product/product.service";
import {
  CreateProductPayload,
  Product,
} from "../../logic/product/product.types";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: 600;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
`;

const AttributeGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const AttributesTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
  display: block;
`;

type FormData = CreateProductPayload;

export const ProductFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id!);
        reset({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          attributes: product.attributes.map(({ name, value }) => ({
            name,
            value,
          })),
        });
      } catch (error) {
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      if (id) {
        await updateProduct(id, { ...data, id });
      } else {
        await createProduct(data);
      }
      navigate("/products");
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || t("common.error"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <PageHeader>
        <PageTitle>{id ? t("products.edit") : t("products.create")}</PageTitle>
      </PageHeader>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t("products.name")}
          error={errors.name?.message}
          {...register("name", { required: t("products.nameRequired") })}
        />
        <Input
          label={t("products.description")}
          multiline
          rows={4}
          error={errors.description?.message}
          {...register("description")}
        />
        <Input
          label={t("products.price")}
          type="number"
          error={errors.price?.message}
          {...register("price", {
            required: t("products.priceRequired"),
            valueAsNumber: true,
            min: { value: 0, message: t("products.priceMin") },
          })}
        />
        <Input
          label={t("products.stock")}
          type="number"
          error={errors.stock?.message}
          {...register("stock", {
            required: t("products.stockRequired"),
            valueAsNumber: true,
            min: { value: 0, message: t("products.stockMin") },
          })}
        />

        <AttributesTitle>{t("products.attributes")}</AttributesTitle>
        <AttributesContainer>
          {fields.map(
            (
              field: FieldArrayWithId<FormData, "attributes">,
              index: number
            ) => (
              <AttributeGroup key={field.id}>
                <Input
                  label={t("attributes.name")}
                  {...register(`attributes.${index}.name` as const)}
                />
                <Input
                  label={t("attributes.value")}
                  {...register(`attributes.${index}.value` as const)}
                />
                <ActionButton type="button" onClick={() => remove(index)}>
                  {t("common.delete")}
                </ActionButton>
              </AttributeGroup>
            )
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ name: "", value: "" })}
          >
            {t("attributes.add")}
          </Button>
        </AttributesContainer>

        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

        <ButtonsContainer>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/products")}
          >
            {t("common.cancel")}
          </Button>
          <Button type="submit" isLoading={submitting}>
            {id ? t("common.save") : t("common.create")}
          </Button>
        </ButtonsContainer>
      </FormContainer>
    </>
  );
};
