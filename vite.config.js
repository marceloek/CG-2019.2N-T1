import { defineConfig } from "vite";

export default defineConfig({
  base: env.NODE_ENV === "development" ? "/" : "/CG-2019.2N-T1",
});
