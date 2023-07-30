
// import './App.css';
import Home from './features/pages/Home';
import LoginPage from "./features/pages/LoginPage";
import SignupPage from "./features/pages/SignupPage"
import CartPage from "./features/pages/CartPage";
import Checkout from "./features/pages/Checkout";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {useEffect} from 'react'
import Protected from './features/auth/components/Protected';
import ProductDetailPage from './features/pages/ProductDetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home/></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout/></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage/></Protected>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user  = useSelector(selectLoggedInUser);
  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))

    }
  },[dispatch,user])
  return (
    <div className="App">
       <RouterProvider router={router} />
          </div>
  );
}

export default App;
