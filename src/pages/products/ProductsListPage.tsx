import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Spinner } from "../../components/common/Spinner";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";
import {
  deleteProduct,
  getProducts,
} from "../../logic/product/product.service";
import { Product, ProductFilters } from "../../logic/product/product.types";

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

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th<{ sortable?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary}33;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
  user-select: none;

  &:hover {
    ${({ sortable, theme }) =>
      sortable && `background-color: ${theme.colors.textSecondary}11;`}
  }
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary}11;
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
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

const SortIcon = styled.span<{ direction?: "asc" | "desc" }>`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: ${({ theme }) => theme.spacing.xs};
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  ${({ direction, theme }) =>
    direction === "asc"
      ? `border-bottom: 4px solid ${theme.colors.primary};`
      : direction === "desc"
      ? `border-top: 4px solid ${theme.colors.primary};`
      : `border-bottom: 4px solid ${theme.colors.textSecondary}33;`}
`;

export const ProductsListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(filters);
      setProducts(response.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSort = (field: NonNullable<ProductFilters["sortBy"]>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeleteLoading(true);
      await deleteProduct(selectedProduct.id);
      await fetchProducts();
      setDeleteModalOpen(false);
      setSelectedProduct(null);
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
        <PageTitle>{t("products.title")}</PageTitle>
        <Button onClick={() => navigate("new")}>{t("products.create")}</Button>
      </PageHeader>

      <FiltersContainer>
        <Input
          placeholder={t("common.search")}
          value={filters.search}
          onChange={handleSearch}
        />
      </FiltersContainer>

      <Table>
        <thead>
          <tr>
            <Th sortable onClick={() => handleSort("name")}>
              {t("products.name")}
              <SortIcon
                direction={
                  filters.sortBy === "name" ? filters.sortOrder : undefined
                }
              />
            </Th>
            <Th>{t("products.description")}</Th>
            <Th sortable onClick={() => handleSort("price")}>
              {t("products.price")}
              <SortIcon
                direction={
                  filters.sortBy === "price" ? filters.sortOrder : undefined
                }
              />
            </Th>
            <Th sortable onClick={() => handleSort("stock")}>
              {t("products.stock")}
              <SortIcon
                direction={
                  filters.sortBy === "stock" ? filters.sortOrder : undefined
                }
              />
            </Th>
            <Th>{t("common.actions")}</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.stock}</Td>
              <Td>
                <ActionButton onClick={() => navigate(`${product.id}/edit`)}>
                  {t("common.edit")}
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteModalOpen(true);
                  }}
                >
                  {t("common.delete")}
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal
        open={deleteModalOpen}
        title={t("products.deleteTitle")}
        message={t("products.deleteMessage", { name: selectedProduct?.name })}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        isLoading={deleteLoading}
      />
    </>
  );
};
