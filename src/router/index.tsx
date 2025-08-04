import { createBrowserRouter, Navigate } from "react-router-dom";
import { SigninPage } from "../pages/SigninPage";
import { SignupPage } from "../pages/SignupPage";
import { ProductsListPage } from "../pages/products/ProductsListPage";
import { ProductFormPage } from "../pages/products/ProductFormPage";
import { AttributesListPage } from "../pages/attributes/AttributesListPage";
import { AttributeFormPage } from "../pages/attributes/AttributeFormPage";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsListPage />,
          },
          {
            path: "new",
            element: <ProductFormPage />,
          },
          {
            path: ":id/edit",
            element: <ProductFormPage />,
          },
        ],
      },
      {
        path: "attributes",
        children: [
          {
            index: true,
            element: <AttributesListPage />,
          },
          {
            path: "new",
            element: <AttributeFormPage />,
          },
          {
            path: ":id/edit",
            element: <AttributeFormPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/products" replace />,
      },
    ],
  },
]);
