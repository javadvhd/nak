import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../logic/auth/auth.store";
import { ProductsIcon } from "../../assets/icons/products";
import { AttributesIcon } from "../../assets/icons/attributes";
import { LogoutIcon } from "../../assets/icons/logout";

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  padding: ${({ theme }) => theme.spacing.md} 0;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  background: none;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const LogoutButton = styled(NavItem)`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.error};
`;

export const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const pathname = window.location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <SidebarContainer>
      <Logo variant="h6">NAK Admin</Logo>
      <NavList>
        <NavItem
          onClick={() => navigate("/products")}
          active={pathname.startsWith("/products")}
        >
          <ProductsIcon />
          {t("products.title")}
        </NavItem>
        <NavItem
          onClick={() => navigate("/attributes")}
          active={pathname.startsWith("/attributes")}
        >
          <AttributesIcon />
          {t("attributes.title")}
        </NavItem>
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          {t("auth.logout")}
        </LogoutButton>
      </NavList>
    </SidebarContainer>
  );
};
