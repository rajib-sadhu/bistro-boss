import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import OrderFood from "../pages/OrderFood/OrderFood";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../pages/Dashboard/ManageItem/ManageItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/order/:category',
                element: <OrderFood />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret /></PrivateRoute>
            },
        ]
    },
    {

        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // User Routes
            {
                path: "myCart",
                element: <MyCart />
            },
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "userHome",
                element: <UserHome />
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory />
            },
            // Admin Routes
            {
                path: "adminHome",
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "addItem",
                element: <AdminRoute><AddItem /></AdminRoute>
            },
            {
                path: "ManageItems",
                element: <AdminRoute><ManageItem /></AdminRoute>
            },
        ]
    }
])