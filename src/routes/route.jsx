import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import CreateTask from "../pages/CreateTask";
import Profile from "../pages/Profile";

const route = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>

            },
            {
                path:"/login",
                element:<Login/>

            },
            {
                path:"/registration",
                element:<Registration/>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<DashboardLayout/>,
        children:[
            {
                index:true,
                element:<Dashboard/>
            },
            {
                path:"createTask",
                element: <CreateTask/>
            },
            {
                path:"user_profile",
                element: <Profile/>
            }
        ]
    }
])

export default route;