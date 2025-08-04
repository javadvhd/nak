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
import { Spinner } from "../../components/common/Spinner";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";
import {
  deleteAttribute,
  getAttributes,
} from "../../logic/attribute/attribute.service";
import { Attribute } from "../../logic/attribute/attribute.types";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

export const AttributesListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAttributes = async () => {
    try {
      setLoading(true);
      const response = await getAttributes();
      setAttributes(response.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchAttributes();
  }, []);

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>
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
              <TableCell>{t("attributes.values")}</TableCell> */}
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
