import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Spinner } from "../../components/common/Spinner";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";
import {
  deleteAttribute,
  getAttributes,
} from "../../logic/attribute/attribute.service";
import {
  Attribute,
  AttributeFilters,
  AttributeType,
} from "../../logic/attribute/attribute.types";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TableActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const AttributeValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const attributeTypeOptions = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "boolean", label: "Boolean" },
];

export const AttributesListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AttributeFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAttributes = async () => {
    try {
      setLoading(true);
      const response = await getAttributes(filters);
      setAttributes(response.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, [filters]);

  const handleSort = (field: NonNullable<AttributeFilters["sortBy"]>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleTypeFilter = (value: AttributeType | "") => {
    setFilters((prev) => ({
      ...prev,
      type: value || undefined,
      page: 1,
    }));
  };

  const handleDelete = async () => {
    if (!selectedAttribute) return;

    try {
      setDeleteLoading(true);
      await deleteAttribute(selectedAttribute.id);
      await fetchAttributes();
      setDeleteModalOpen(false);
      setSelectedAttribute(null);
    } catch (error) {
      // Handle error
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4">{t("attributes.title")}</Typography>
        <Button onClick={() => navigate("new")}>
          <Add />
          {t("attributes.create")}
        </Button>
      </PageHeader>

      <FiltersContainer>
        <Input
          placeholder={t("common.search")}
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          placeholder={t("attributes.filterByType")}
          value={filters.type || ""}
          onChange={(e) =>
            handleTypeFilter(e.target.value as AttributeType | "")
          }
          options={[
            { value: "", label: t("attributes.allTypes") },
            ...attributeTypeOptions,
          ]}
        />
      </FiltersContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === "name"}
                  direction={filters.sortOrder}
                  onClick={() => handleSort("name")}
                >
                  {t("attributes.name")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === "type"}
                  direction={filters.sortOrder}
                  onClick={() => handleSort("type")}
                >
                  {t("attributes.type")}
                </TableSortLabel>
              </TableCell>
              <TableCell>{t("attributes.values")}</TableCell>
              <TableCell align="right">{t("common.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell>{attribute.name}</TableCell>
                <TableCell>{attribute.type}</TableCell>
                <TableCell>
                  <AttributeValues>
                    {attribute.values.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </AttributeValues>
                </TableCell>
                <TableCell align="right">
                  <TableActions>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`${attribute.id}/edit`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedAttribute(attribute);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={deleteModalOpen}
        title={t("attributes.deleteTitle")}
        message={t("attributes.deleteMessage", {
          name: selectedAttribute?.name,
        })}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedAttribute(null);
        }}
        isLoading={deleteLoading}
      />
    </>
  );
};
