export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      lamba: {
        alwaysUseUpToDateVersions: true
      }
    }
  }
})
