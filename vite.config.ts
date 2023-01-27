import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
// import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
  plugins: [
    // FullReload(['config/routes.rb', 'app/views/**/*'], { delay: 200 }),
    RubyPlugin(),
  ],
})
