export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.isLogged) {
    return navigateTo({
      path: "/connexion",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
