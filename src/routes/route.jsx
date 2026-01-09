import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import CreateNewPost from "../dashboard/pages/community/CreateNewPost";
import MockTest from "../dashboard/pages/mock-test/MockTest";

const Routes = createBrowserRouter(
    [
    
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/community',
                    element: <CreateNewPost />
                },
                {
                    path: '/mock-exam',
                    element: <MockTest/>
                },
            ]
        }
    ]
)

export default Routes