<script>
import { mapWritableState, mapActions } from 'pinia'
import { useCuisineStore } from '../stores/cuisineStore'
export default {
  methods: {
    ...mapActions(useCuisineStore, ['swalFire']),
    logout() {
      let username = localStorage.username
      this.swalFire('LogoutSuccess', `${username} is successfully logged out.`)
      localStorage.clear()
      this.$router.push('/home')
      this.isLogin = false
    }
  },
  computed: {
    ...mapWritableState(useCuisineStore, ['isLogin'])
  }
}
</script>

<template>
  <nav class="navbar fixed-top navbar-dark navbar-expand-lg" style="background-color: #bd0018">
    <div class="container-fluid m-1">
      <RouterLink to="/home" class="navbar-brand">
        <img src="../assets/image/McDanold's_logo-cadd4294.svg" width="35" alt="McDanold's" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/home" class="nav-link text-white">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <RouterLink to="/login" class="nav-link text-white">Sign In</RouterLink>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <RouterLink to="/register" class="nav-link text-white">Sign Up</RouterLink>
          </li>
          <li class="nav-item" v-if="isLogin">
            <RouterLink to="/favorites" class="nav-link text-white">Favorites</RouterLink>
          </li>
          <li class="nav-item" v-if="isLogin">
            <a @click.prevent="logout" class="nav-link text-white logout-link">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logout-link:hover {
  cursor: pointer;
}
</style>
