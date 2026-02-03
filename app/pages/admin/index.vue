<template>
  <div class="dashboard-admin p-6 bg-gray-100 min-h-screen">
    <!-- HEADER -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-black flex items-center gap-3">
          <i class="fas fa-tachometer-alt text-black"></i> Tableau de bord
        </h1>
      </div>
      <div class="mt-4 md:mt-0 bg-white shadow rounded-lg px-4 py-2 flex items-center gap-2 text-gray-600 font-medium">
        <i class="far fa-calendar text-blue-600"></i> {{ currentDate }}
      </div>
    </header>

    <!-- STATS -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600 flex flex-col justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-blue-600 text-white p-3 rounded-lg">
            <i class="fas fa-euro-sign"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.ca }} FCFA</h3>
            <p class="text-gray-500 text-sm">Chiffre d'affaires</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-5 border-l-4 border-green-500 flex flex-col justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-green-500 text-white p-3 rounded-lg">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.commandes }}</h3>
            <p class="text-gray-500 text-sm">Commandes ce mois</p>
          </div>
        </div>

      </div>

      <div class="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500 flex flex-col justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-yellow-500 text-white p-3 rounded-lg">
            <i class="fas fa-book"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.livres }}</h3>
            <p class="text-gray-500 text-sm">Livres au total</p>
          </div>
        </div>

      </div>

      <div class="bg-white rounded-xl shadow p-5 border-l-4 border-purple-600 flex flex-col justify-between">
        <div class="flex items-center gap-4">
          <div class="bg-purple-600 text-white p-3 rounded-lg">
            <i class="fas fa-users"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.clients }}</h3>
            <p class="text-gray-500 text-sm">Clients actifs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GRAPHIQUE & DONNÉES RAPIDES -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Graphique -->
      <div class="lg:col-span-2 bg-white shadow rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-chart-line text-blue-600"></i> Ventes des 30 derniers jours
          </h3>
          <select v-model="periodeGraphique" class="border rounded-lg px-3 py-1 text-sm">
            <option value="7">7 jours</option>
            <option value="30">30 jours</option>
            <option value="90">90 jours</option>
          </select>
        </div>
        <div class="flex gap-2 h-48 items-end justify-between">
          <div v-for="(vente, index) in ventesJournalieres" :key="index"
               class="bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600"
               :style="{ height: (vente / maxVentes) * 100 + '%' }"
               :title="'Jour ' + (index + 1) + ': ' + vente + ' FCFA'">
          </div>
        </div>
        <div class="flex justify-between text-gray-500 text-sm mt-2 font-medium">
          <span>Derniers 7 jours</span>
          <span>Total: {{ totalVentes7jours }} €</span>
        </div>
      </div>

      <!-- Données rapides -->
      <div class="flex flex-col gap-6">
  <!-- Commandes en attente -->
  <div class="bg-white shadow rounded-xl p-5 text-center">
    <h4 class="font-bold text-black flex justify-center items-center gap-2 mb-2">
      <i class="fas fa-clock text-blue-600"></i> Commandes en attente
    </h4>
    <p class="text-3xl font-bold mb-3" style="color: #6a0d5f;">{{ stats.commandesEnAttente }}</p>
    <router-link 
      to="/admin/commandes" 
      class="inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition" 
      style="color: #6a0d5f;"
    >
      Voir
    </router-link>
  </div>

  <!-- Nombre de livres en stock épuisé -->
  <div class="bg-white shadow rounded-xl p-5 text-center">
    <h4 class="font-bold text-black flex justify-center items-center gap-2 mb-2">
      <i class="fas fa-exclamation-triangle text-blue-600"></i> Nombre de livres en stock épuisé
    </h4>
    <p class="text-3xl font-bold mb-3" style="color: #6a0d5f;">{{ stats.stocksBas }}</p>
    <router-link 
      to="/admin/produits" 
      class="inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition" 
      style="color: #6a0d5f;"
    >
      Gérer
    </router-link>
  </div>

  <!-- Avis en attente -->
  <div class="bg-white shadow rounded-xl p-5 text-center">
    <h4 class="font-bold text-black flex justify-center items-center gap-2 mb-2">
      <i class="fas fa-star text-green-500"></i> Livres les plus vendus
    </h4>
    <p class="text-3xl font-bold mb-3" style="color: #6a0d5f;">{{ stats.avisEnAttente }}</p>
    <router-link 
      to="/admin/produits" 
      class="inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition" 
      style="color: #6a0d5f;"
    >
      Voir
    </router-link>
  </div>
      </div>

    </section>
    
  </div>
</template>

<script>
export default {
  name: "DashboardAdmin",
  data() {
    return {
      adminName: "Administrateur",
      currentDate: this.formatDate(new Date()),
      periodeGraphique: "7",
      stats: {
        ca: 500000,
        commandes: 50,
        livres: 200,
        clients: 100,
        commandesEnAttente: 1,
        stocksBas: 2,
        avisEnAttente: 23
      },
      ventesJournalieres: [450, 520, 380, 610, 720, 580, 490],
      dernieresCommandes: [
        { id: 1045, client: "Marie Martin", date: "15/01/2024", montant: "67.50", statut: "En attente" },
        { id: 1044, client: "Pierre Dubois", date: "14/01/2024", montant: "42.30", statut: "Payée" },
        { id: 1043, client: "Sophie Leroy", date: "14/01/2024", montant: "89.90", statut: "Expédiée" },
        { id: 1042, client: "Jean Petit", date: "13/01/2024", montant: "34.80", statut: "Livrée" },
        { id: 1041, client: "Julie Bernard", date: "13/01/2024", montant: "56.70", statut: "Annulée" }
      ]
    };
  },
  computed: {
    maxVentes() {
      return Math.max(...this.ventesJournalieres);
    },
    totalVentes7jours() {
      return this.ventesJournalieres.reduce((a, b) => a + b, 0);
    }
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    },
    voirCommande(id) {
      this.$router.push(`/admin/commandes/${id}`);
    },
    statusClass(statut) {
      switch (statut) {
        case "En attente": return "bg-yellow-100 text-yellow-800";
        case "Payée": return "bg-blue-100 text-blue-800";
        case "Expédiée": return "bg-green-100 text-green-800";
        case "Livrée": return "bg-green-200 text-green-900";
        case "Annulée": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
      }
    }
  }
};
</script>

<style scoped>
</style>

<script setup>
definePageMeta({
  layout: "dashboard"
});
</script>
