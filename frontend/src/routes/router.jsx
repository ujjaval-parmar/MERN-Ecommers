import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ForgotPassword from '../pages/ForgotPassword';
import SignUpPage from '../pages/SignUpPage';
import ErrorPage from '../pages/ErrorPage';
import AdminPanel from '../pages/AdminPanel';
import AllUsersPage from '../pages/AllUsersPage';
import AllProductsPage from '../pages/AllProductsPage';
import CategoryProductPage from '../pages/CategoryProductPage';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import SearchProductPage from '../pages/SearchProductPage';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/product-category/:categoryName',
        element: <CategoryProductPage />
      },
      {
        path: '/product-detail/:productId',
        element: <ProductDetail />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/search',
        element: <SearchProductPage />
      },
      {
        path: '/admin-panel',
        element: <AdminPanel />,
        children: [
          
          {
            path: 'all-users',
            element: <AllUsersPage />
          },
          {
            path: 'all-products',
            element: <AllProductsPage />
          }
            
        ]
      }
    ],
    errorElement: <ErrorPage />
  }

]);


export default router;