<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCuisineStore } from '../stores/cuisineStore'

export default {
  methods: {
    ...mapActions(useCuisineStore, ['login', 'googleLogin']),
    async loginGoogle(response) {
      try {
        this.googleLogin(response.credential)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapWritableState(useCuisineStore, ['isLogin', 'email', 'password'])
  }
}
</script>

<template>
  <div class="container" id="box">
    <h2>Log in to your account</h2>
    <hr />
    <form id="login-form" @submit.prevent="login">
      <div class="mb-3 mt-3">
        <div class="d-flex justify-content-between">
          <label for="login-email">Email</label>
          <label class="text-danger text-end fw-bold">*</label>
        </div>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="login-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="mb-4">
        <div class="d-flex justify-content-between">
          <label for="login-password">Password</label>
          <label class="text-danger text-end fw-bold">*</label>
        </div>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="login-password"
          placeholder="Enter your password ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="checkbox mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="login-remember" />
          <label class="form-check-label" for="login-remember">Remember me</label>
        </div>
      </div>
      <button class="btn btn-lg btn-danger rounded-pill w-100 p-2" type="submit">Log In</button>
    </form>
    <span class="d-flex justify-content-center mx-auto my-4">or Sign In with</span>
    <div style="text-align: center">
      <GoogleLogin :callback="loginGoogle" prompt style="display: inline-block" />
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

#box {
  max-width: 400px;
  margin-top: 60px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
