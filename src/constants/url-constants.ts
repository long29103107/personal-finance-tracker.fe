const URL_CONSTANTS = {
  IDENTITY: {
    ROLE: '/roles',
  },
  AUTH: {
    LOGIN_GOOGLE: '/identity/authentication/google-login',
    LOGOUT: '/identity/authentication/logout',
  },
} as const

export default URL_CONSTANTS
