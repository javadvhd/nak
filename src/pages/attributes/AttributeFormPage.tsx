import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Button } from "../../components/common/Button";
import { Spinner } from "../../components/common/Spinner";
import {
  createAttribute,
  getAttribute,
  updateAttribute,
} from "../../logic/attribute/attribute.service";
import {
  CreateAttributePayload,
  AttributeType,
} from "../../logic/attribute/attribute.types";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ValueGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const attributeTypeOptions = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "boolean", label: "Boolean" },
] as const;

type FormData = CreateAttributePayload & {
  values: string[];
};

export const AttributeFormPage = () => {
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
    watch,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      values: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const selectedType = watch("type") as AttributeType | undefined;

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const attribute = await getAttribute(id!);
        reset({
          name: attribute.name,
          type: attribute.type,
          values: attribute.values,
        });
      } catch (error) {
        navigate("/attributes");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAttribute();
    }
  }, [id, navigate, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      if (id) {
        await updateAttribute(id, { ...data, id });
      } else {
        await createAttribute(data);
      }
      navigate("/attributes");
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
        <Typography variant="h4">
          {id ? t("attributes.edit") : t("attributes.create")}
        </Typography>
      </PageHeader>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t("attributes.name")}
          error={errors.name?.message}
          {...register("name", { required: t("attributes.nameRequired") })}
        />

        <Select
          label={t("attributes.type")}
          error={errors.type?.message}
          options={attributeTypeOptions}
          {...register("type", { required: t("attributes.typeRequired") })}
        />

        {selectedType === "select" && (
          <>
            <Typography variant="h6">{t("attributes.values")}</Typography>
            <ValuesContainer>
              {fields.map(
                (
                  field: FieldArrayWithId<FormData, "values">,
                  index: number
                ) => (
                  <ValueGroup key={field.id}>
                    <Input
                      {...register(`values.${index}`)}
                      placeholder={t("attributes.valueLabel")}
                    />
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ValueGroup>
                )
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={() => append("")}
              >
                <AddIcon />
                {t("attributes.addValue")}
              </Button>
            </ValuesContainer>
          </>
        )}

        {errors.root && (
          <Typography color="error" variant="caption">
            {errors.root.message}
          </Typography>
        )}

        <ButtonsContainer>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/attributes")}
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
