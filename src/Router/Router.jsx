import { createBrowserRouter } from "react-router";
import Root from "../LayOut/Root";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import PlaceOrder from "../Pages/PlaceOrder/PlaceOrder";
import TrackDelivery from "../Pages/TrackDelivery/TrackDelivery";
import Payment from "../Pages/Payment/Payment";
import AcceptDeliveryRequest from "../Pages/AcceptDeliveryRequest/AcceptDeliveryRequest";
import DeliveryStatus from "../Pages/DeliveryStatus/DeliveryStatus";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import Coverage from "../Pages/Admin/Coverage";
import AuthLayout from "../LayOut/AuthLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/place-order",
                element: <PlaceOrder></PlaceOrder>
            },
            {
                path: "/track-delivery",
                element: <TrackDelivery></TrackDelivery>
            },
            {
                path: "/payment",
                element: <Payment></Payment>
            },
            {
                path: "/Accept-delivery-request",
                element: <AcceptDeliveryRequest></AcceptDeliveryRequest>
            },
            {
                path: "/Update-delivery-status",
                element: <DeliveryStatus></DeliveryStatus>
            },
            {
                path: "/View-earnings",
                element: <Contact></Contact>
            },
            {
                path: "/Dashboard-analytics",
                element: <Contact></Contact>
            },
            {
                path: "/Manage-users",
                element: <Contact></Contact>
            },
            {
                path: "/Manage-deliveries",
                element: <Contact></Contact>
            },
            {
                path: "/Manage-orders",
                element: <Contact></Contact>
            },
            {
                path: "/Assign-riders",
                element: <Contact></Contact>
            },
            {
                path: "/View-reports",
                element: <Contact></Contact>
            },
            {
                path: "/coverage",
                element: <Coverage></Coverage>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
           
            
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
             {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
        ]
    }
])