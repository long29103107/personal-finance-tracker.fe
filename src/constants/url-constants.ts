const URL_CONSTANTS = {
  IDENTITY: {
    ROLE: '/roles',
  },
  AUTH: {
    LOGIN_GOOGLE: '/identity/authentication/google-login',
    LOGOUT: '/identity/authentication/logout',
  },
  TRACKER: {
    DASHBOARD: {
      TOTAL_BALANCES: '/tracker/dashboard/total-balance',
    },
  },
} as const

export default URL_CONSTANTS
