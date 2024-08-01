import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import VideoList from "../pages/VideoList";
import PlayVideo from "../pages/PlayVideo";

const router= createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/videolist",
                element:<VideoList/>
            },
            {
                path:"/videolist/:_id",
                element:<PlayVideo/>
            }
        ]
    }
])

export default router;