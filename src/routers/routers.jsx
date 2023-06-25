import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import FlashSale from "../pages/FlashSale/FlashSale";
import Search from "../pages/Search/Search";
import AllCategory from "../pages/All-Category/AllCategory";
import Details from "../pages/Details/Details";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ChatBox from "../pages/Chat-GPT/Chat";
import Carts from "../pages/Carts/Carts";
import OneStepCheckOut from "../pages/OneStepCheckOut/OneStepCheckOut";
import UserProfile from "../pages/Info/Info";
import HistoryOrders from "../pages/HistoryOrders/HistoryOrders";
import IdHistoryOrders from "../pages/HistoryOrders/IdHistoryOrder";
import ListBooks from "../pages/ListBooks/ListBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/flashsale",
    element: <FlashSale />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/all-category",
    element: <AllCategory />,
  },
  {
    path: "/details/:idBook",
    element: <Details />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <ChatBox />,
  },
  {
    path: "/cart",
    element: <Carts />,
  },
  {
    path: "/onestepcheckout",
    element: <OneStepCheckOut />,
  },
  {
    path: "/info",
    element: <UserProfile />,
  },
  {
    path: "/history-orders",
    element: <HistoryOrders />,
  },
  {
    path: "/history-orders/:id",
    element: <IdHistoryOrders />,
  },
  {
    path: "/listbooks",
    element: <ListBooks/>
  }
]);

export default router;
