import { createBrowserRouter } from "react-router";
import Root from "../LayOut/Root";
import Home from "../Pages/Public/Home/Home";
import About from "../Pages/Public/About/About";
import Contact from "../Pages/Public/Contact/Contact";
import PlaceOrder from "../Pages/Customer/SendParcel/SendParcel";
import TrackDelivery from "../Pages/Rider/TrackDelivery/TrackDelivery";
// import Payment from "../Pages/Customer/Payment/Payment";
import AcceptDeliveryRequest from "../Pages/Admin/AcceptDeliveryRequest/AcceptDeliveryRequest";
import DeliveryStatus from "../Pages/Admin/DeliveryStatus/DeliveryStatus";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import Coverage from "../Pages/Public/Coverage";
import AuthLayout from "../LayOut/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import DashboardLayout from "../LayOut/DashboardLayout";
import MyParcelsAndPayment from "../Pages/Customer/MyParcel/MyParcelsAndPayment";
import PaymentSuccessModal from "../Pages/Customer/Payment/PaymentSuccessModal";
import PaymentCancelModal from "../Pages/Customer/Payment/PaymentCancelModal";
import PaymentHistory from "../Pages/Customer/Payment/MyPaymentHistory";
import ModalOTP from "../Pages/Customer/Payment/ModalOTP";
import ApproveRider from "../Pages/Admin/ApproveRider/ApproveRider";
import UserManagement from "../Pages/Admin/UserManagement/UserManagement";


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
                path: "/coverage",
                element: <Coverage></Coverage>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
            {
                path: "/send-parcel",
                element: <PrivateRoute><PlaceOrder></PlaceOrder></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
            {
                path: "/modal-otp",
                element: <ModalOTP></ModalOTP>,
            },
            {
                path: "/my-parcels",
                element: <MyParcelsAndPayment></MyParcelsAndPayment>
            },
            // {
            //     path: "/payment/:parcelId",
            //     element: <PrivateRoute><Payment></Payment></PrivateRoute>
            // },
            {
                path: "/payment-success",
                element: <PaymentSuccessModal></PaymentSuccessModal>
            },
            {
                path: "/payment-cancelled",
                element: <PaymentCancelModal></PaymentCancelModal>
            },
            {
                path: "/payment-history",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "/track-delivery",
                element: <TrackDelivery></TrackDelivery>
            },
            {
                path: "/Rider",
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
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
            


        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
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
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "approve-rider",
                element: <ApproveRider></ApproveRider>
            },
            {
                path: "user-management",
                element: <UserManagement></UserManagement>
            },
        ]
    }

])