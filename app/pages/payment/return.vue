<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Redirection en cours...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// si Nuxt 3, c'est auto-importé, sinon garde l'import
// import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();

onMounted(() => {
  const status = route.query.status;

  if (status === "success") {
    toast.success("Paiement effectué avec succès");
  } else {
    toast.error("Paiement échoué");
  }

  router.push("/");
});
</script>
