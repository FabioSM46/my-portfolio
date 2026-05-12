import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import { execSync } from 'child_process'

function getGitCommit(): { full: string; short: string } {
  try {
    const full = execSync('git rev-parse HEAD').toString().trim()
    const short = execSync('git rev-parse --short HEAD').toString().trim()
    return { full, short }
  } catch {
    return { full: 'unknown', short: 'unknown' }
  }
}

const { full: gitCommitFull, short: gitCommitShort } = getGitCommit()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __GIT_COMMIT__: JSON.stringify(gitCommitFull),
    __GIT_COMMIT_SHORT__: JSON.stringify(gitCommitShort),
  },
})
