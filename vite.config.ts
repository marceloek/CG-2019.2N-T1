import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { baseRepo } from './src/utils'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseRepo,
})
