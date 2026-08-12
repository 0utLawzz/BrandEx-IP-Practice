export const appConfig = {
  name: 'BrandEx IP Practice',
  description: 'IP Law Practice Management System',
  version: '0.1.0',
  environment: import.meta.env.MODE || 'development',
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 30000,
  },
  features: {
    multiTenant: true,
    // Future feature flags can be added here
  },
} as const;
