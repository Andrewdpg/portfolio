import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import RequireAuth from './RequireAuth'

type ProtectedRouteProps = {
  redirectPath?: string
  unAuthorizedPath?: string
  roles?: string[]
}

/**
 * ProtectedRoute component to protect routes that require authentication and specific roles.
 * @param {ProtectedRouteProps} props - The properties for the ProtectedRoute component.
 * @param {string} [props.redirectPath='/login'] - The path to redirect to if the user is not authenticated. Defaults to '/login'.
 * @param {string} [props.unAuthorizedPath='/unauthorized'] - The path to redirect to if the user does not have the required roles. Defaults to '/unauthorized'.
 * @param {string[]} [props.roles=[]] - The roles required to access the route. Defaults to an empty array.
 * @returns {JSX.Element} The rendered ProtectedRoute component.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
  unAuthorizedPath = '/unauthorized',
  roles = [],
}) => {
  return (
    <RequireAuth
      fallback={<Navigate to={redirectPath} replace />}
      unauthorized={<Navigate to={unAuthorizedPath} />}
      roles={roles}
    >
      <Outlet />
    </RequireAuth>
  )
}

export default ProtectedRoute
