<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useCuisineStore } from './stores/cuisineStore'
export default {
  components: {
    NavBar,
    Footer
  },
  methods: {
    ...mapActions(useCuisineStore, ['fetchCuisines', 'fetchFavorites'])
  },
  computed: {
    ...mapWritableState(useCuisineStore, ['isLogin'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    }
    this.fetchCuisines()
    this.fetchFavorites()
  }
}
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
    <!-- <Footer /> -->
  </div>
</template>

<style scoped></style>
