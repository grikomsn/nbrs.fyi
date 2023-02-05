declare namespace NodeJS {
  interface ProcessEnv {
    readonly EDGE_CONFIG: string;
    readonly HOST: string;
    readonly PEEK_SECRET: string;
  }
}
