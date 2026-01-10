import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import CreateNewPost from "../dashboard/pages/community/CreateNewPost";
import MockTest from "../dashboard/pages/mock-test/MockTest";
import FastTest from "../dashboard/pages/mock-test/FastTest";
import CreateNewMcq from "../dashboard/pages/mcq/CreateNewMcq";

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
                {
                    path: '/practice-exam',
                    element: <FastTest/>
                },
                {
                    path: '/create-mcq',
                    element: <CreateNewMcq/>
                },
            ]
        }
    ]
)

export default Routes