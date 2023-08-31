import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './../pages/operators/login/Login';
import MainLayout from './../components/layout/MainLayout';
import Home from './../pages/home/Home';
import ErrorPage from './../components/common/ErrorPage';
import { BranchList, CreateBranch, UpdateBranch} from '../routers/Branch';
import { OperatorList, CreateOperator, UpdateOperator} from '../routers/Operator'
import ChangePassword from './../pages/operators/ChangePassword';
const Router = () =>{
  const router = createBrowserRouter([
    {
      path : "/",
      element : <MainLayout/>,
      errorElement: <ErrorPage />,
      children : [
        {
          path : '/',
          element : <Home/>
        },
        {
          path: '/branch',
          element: <BranchList/>
        },
        {
          path: '/branch/create',
          element: <CreateBranch/>
        },
        {
          path: '/branch/:branchId/edit',
          element: <UpdateBranch/>
        },
        {
          path: '/operator',
          element: <OperatorList/>
        },
        {
          path: '/operator/create',
          element: <CreateOperator/>
        },
        {
          path: '/operator/:operatorId/edit',
          element: <UpdateOperator/>
        },
        {
          path : '/api/operator/change_password',
          element: <ChangePassword/>
        }
      ]
    },
    {
      path: '/login',
      element : <Login/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  )

}
export default Router;