import React from 'react'
import { selectAuth } from '../../../store/slices/authSlice'
import { useAppSelector } from '../../../hooks/useAppSelector'

type RequireAuthProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  unauthorized?: React.ReactNode
  roles?: string[]
}

/**
 * Validates if the user's roles match the required roles.
 * @param userRoles - Roles assigned to the user.
 * @param requiredRoles - Roles required to access the element
 * @returns {boolean} - True if the user has at least one of the required roles.
 */
const hasRequiredRoles = (
  userRoles: string[],
  requiredRoles: string[]
): boolean => {
  return requiredRoles.some((role) => userRoles.includes(role))
}

/**
 * RequireAuth component to protect elements that require authentication and specific roles.
 * @param {RequireAuthProps} props - The properties for the RequireAuth component.
 * @param {React.ReactNode} props.child - The child element to render if the user is authenticated and has the required roles.
 * @param {React.ReactNode} props.fallback - The element to render if the user is not authenticated.
 * @param {React.ReactNode} [props.unauthorized] - The element to render if the user is authenticated but does not have the required roles.
 * @param {string[]} [props.roles=[]] - The roles required to access the element. Defaults to an empty array.
 * @returns {JSX.Element} The rendered RequireAuth component.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  fallback = null,
  unauthorized,
  roles = [],
}) => {
  const { isAuthenticated, user } = useAppSelector(selectAuth)

  if (!isAuthenticated) {
    return <>{fallback}</>
  }

  if (roles.length > 0) {
    if (!user || !hasRequiredRoles(user.roles, roles)) {
      return <>{unauthorized ? unauthorized : fallback}</>
    }
  }

  return <>{children}</>
}

export default RequireAuth
