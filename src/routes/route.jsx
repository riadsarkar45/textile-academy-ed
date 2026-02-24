import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import CreateNewPost from "../dashboard/pages/community/CreateNewPost";
import MockTest from "../dashboard/pages/mock-test/MockTestStartUp";
import FastTest from "../dashboard/pages/mock-test/FastTest";
import CreateNewMcq from "../dashboard/pages/mcq/CreateNewMcq";
import QuestionBank from "../dashboard/pages/questionBank/QuestionBank";
import McqQuestions from "../dashboard/pages/questionBank/McqQuestionsBank";
import StartExam from "../dashboard/pages/questionBank/StartExam";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import Dashboard from "../dashboard/home/Dashboard";
import CompetitiveExam from "../dashboard/competitiveExam/CreateComExam";
import CreatedRooms from "../dashboard/competitiveExam/CreatedRooms";
import ExamRoom from "../dashboard/pages/community/live-exam-room/ExamRoom";
import Exam from "../dashboard/pages/questionBank/WrittenExam";

const Routes = createBrowserRouter(
    [

        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />
                },
                {
                    path: '/community',
                    element: <CreateNewPost />
                },
                {
                    path: '/mock-exam',
                    element: <MockTest />
                },
                {
                    path: '/practice-exam',
                    element: <FastTest />
                },
                {
                    path: '/create-mcq',
                    element: <CreateNewMcq />
                },
                {
                    path: '/question-bank',
                    element: <QuestionBank />
                },
                {
                    path: '/question-bank/exam/:subjectId',
                    element: <McqQuestions />
                },
                {
                    path: '/live-exam/mcq/:subjectId/:yearId',
                    element: <StartExam />
                },
                {
                    path: '/exam/mcq/:subjectId/:yearId',
                    element: <Exam />
                },
                {
                    path: '/competitive-exam',
                    element: <CompetitiveExam />
                },
                {
                    path: '/created-rooms',
                    element: <CreatedRooms />
                },
                {
                    path: '/exam-room/:roomId',
                    element: <ExamRoom />
                },
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Registration />
        }
    ]
)

export default Routes