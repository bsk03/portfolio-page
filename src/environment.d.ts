declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV_VERSION: 'development' | 'production'
      PAYLOAD_SECRET: string
      DATABASE_HOST: string
      DATABASE_PORT: number
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      DATABASE_NAME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
