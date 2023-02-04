declare namespace NodeJS {
  interface ProcessEnv {
    readonly EDGE_CONFIG: string;
    readonly HOST: string;
  }
}
