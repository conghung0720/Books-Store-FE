import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import FlashSale from "../pages/FlashSale/FlashSale";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/flashsale",
    element: <FlashSale />,
  },
]);

export default router;
