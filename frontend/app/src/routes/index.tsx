import React, { createContext, useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Recommendations from '../pages/Recommendations'
import CreateSurvey from '../pages/CreateSurvey'
import { useAuth } from '../auth/authProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { IAuthContext } from '../auth/authProvider'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Outlet } from 'react-router-dom'

const routesForPublic: any = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '/recommendations',
    name: 'Recommendations',
    element: <Recommendations />
  }
]

const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin/',
        allowedRoles: ['admin'],
        element: <Outlet />,
        children: [
          {
            path: 'register/',
            name: 'Register Users',
            element: <Register />
          }
        ]
      },
      {
        path: 'service/',
        allowedRoles: ['service'],
        element: <Outlet />,
        children: [
          {
            path: 'createsurvey/',
            name: 'Create Survey',
            element: <CreateSurvey />
          }
        ]
      }
    ]
  }
]

const routesForNotAuthenticatedOnly = [
  {
    path: '/login/',
    name: 'Login',
    element: <Login />
  }
]

const navbarRouteNames = ['Home', 'Register Users', 'Login', 'Create Survey']

export interface IRoutesContext {
  getCurrentRouteName: (currentPath: string) => string
  getOtherNavbarRoutes: (currentPath: string, userRole: string) => any
}

const RoutesContext = createContext<IRoutesContext | null>(null)

const Routes = () => {
  const { userRole } = useAuth() as IAuthContext
  const routes = [...routesForPublic, ...(userRole === '' ? routesForNotAuthenticatedOnly : []), ...routesForAuthenticatedOnly]
  const router = createBrowserRouter(routes)

  const contextFunctions: IRoutesContext = { getCurrentRouteName, getOtherNavbarRoutes }

  function getCurrentRouteName(currentPath: string): string {
    return getCurrentRouteName_(routes, currentPath, '')
  }

  function getCurrentRouteName_(routes: any, currentPath: string, recursivePath: string): string {
    for (const route of routes) {
      console.log(recursivePath + route.path)
      console.log(currentPath)
      if ('name' in route && recursivePath + route.path === currentPath) {
        return route.name
      } else if ('children' in route) {
        const routeName = getCurrentRouteName_(route['children'], currentPath, recursivePath + route.path)
        if (routeName !== '') return routeName
      }
    }
    return ''
  }

  function getOtherNavbarRoutes(currentPath: string, userRole: string): any {
    return getOtherNavbarRoutes_(routes, currentPath, userRole)
  }

  function getOtherNavbarRoutes_(routes: any, currentPath: string, userRole: string): any {
    const navbarRoutes: any[] = []
    for (const routeName of navbarRouteNames) {
      if (routeName === getCurrentRouteName_(routes, currentPath, '')) continue
      else {
        const route = getOtherNavbarRoute(routes, routeName, userRole)
        if (route !== undefined) {
          navbarRoutes.push(route)
        }
      }
    }
    return navbarRoutes
  }

  function getOtherNavbarRoute(routes: any, routeName: string, userRole: string): any {
    return getOtherNavbarRoute_(routes, routeName, '', userRole)
  }

  function getOtherNavbarRoute_(routes: any, routeName: string, routePath: string, userRole: string): any {
    for (const route of routes) {
      if ('children' in route) {
        if ('allowedRoles' in route && !route.allowedRoles.includes(userRole)) continue
        const foundRoute = getOtherNavbarRoute_(route['children'], routeName, routePath + route.path, userRole)
        if (foundRoute) return foundRoute
      } else if ('name' in route && route.name === routeName) {
        const routeTmp = JSON.parse(JSON.stringify(route))
        routeTmp.path = routePath + routeTmp.path
        return routeTmp
      }
    }
  }

  return (
    <RoutesContext.Provider value={contextFunctions}>
      <RouterProvider router={router} />
    </RoutesContext.Provider>
  )
}

export const useRoutesContext = () => useContext(RoutesContext)

export default Routes
