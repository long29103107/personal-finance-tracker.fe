const URL_CONSTANTS = {
  IDENTITY: {
    ROLE: '/roles',
  },
  AUTH: {
    LOGIN_GOOGLE: '/api/authentication/google-login',
    LOGOUT: '/authentication/logout',
  },
} as const

export default URL_CONSTANTS
