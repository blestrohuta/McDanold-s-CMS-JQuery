<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCuisineStore } from '../stores/cuisineStore'
export default {
  methods: {
    ...mapActions(useCuisineStore, ['register'])
  },
  computed: {
    ...mapWritableState(useCuisineStore, [
      'username',
      'email',
      'password',
      'phoneNumber',
      'address'
    ])
  }
}
</script>

<template>
  <div class="container" id="box">
    <h2>Sign up and enjoy</h2>
    <hr />
    <form id="register-form" @submit.prevent="register">
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <label for="register-username">Username</label>
          <label class="text-danger text-end fw-bold">*</label>
        </div>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="register-username"
          placeholder="Enter your username ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <label for="register-email">Email</label>
          <label class="text-danger text-end fw-bold">*</label>
        </div>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="register-email"
          placeholder="Enter email address ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <label for="register-password">Password</label>
          <label class="text-danger text-end fw-bold">*</label>
        </div>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="register-password"
          placeholder="Enter your password ..."
          autocomplete="off"
          required
        />
      </div>
      <div class="mb-3">
        <label for="register-phone">Phone Number</label>
        <input
          v-model="phoneNumber"
          type="text"
          class="form-control"
          id="register-phone"
          placeholder="Enter phone number (optional) ..."
          autocomplete="off"
        />
      </div>
      <div class="mb-3">
        <label for="register-address">Address</label>
        <textarea
          v-model="address"
          for="register-address"
          id="register-address"
          class="form-control"
          rows="3"
          placeholder="Enter your address (optional) ..."
          autocomplete="off"
        ></textarea>
      </div>
      <button class="btn btn-lg btn-danger rounded-pill w-100 p-2 mt-3" type="submit">
        Sign Up
      </button>
    </form>
  </div>
</template>

<style scoped>
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

#box {
  max-width: 400px;
  margin-top: 50px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form input {
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

form input[type='radio'] {
  margin-right: 5px;
}
</style>
