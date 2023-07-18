/* eslint-disable no-unused-vars */
import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useCuisineStore = defineStore('cuisine', {
  state: () => ({
    baseUrl: 'http://localhost:3000/customers/',
    isLogin: false,
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    cuisines: [],
    totalCuisines: 0,
    favorites: [],
    cuisinesWithId: {
      name: '',
      description: '',
      price: 0,
      imgUrl: '',
      author: '',
      category: '',
      qrCodeUrl: ''
    }
  }),
  actions: {
    swalFire(value, data) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })

      switch (value) {
        case 'LoginSuccess':
        case 'RegisterSuccess':
        case 'LogoutSuccess':
          Toast.fire({
            icon: 'success',
            iconColor: 'red',
            background: '#191919',
            color: 'white',
            template: '#toast-template',
            title: data
          })
          break
        case 'SuccessAddedFavorite':
          Swal.fire({
            icon: 'success',
            iconColor: 'red',
            confirmButtonColor: 'red',
            background: '#191919',
            color: 'white',
            template: '#my-template',
            title: data
          })
          break
        case 'LoginError':
        case 'RegisterError':
        case 'ErrorAddedFavorite':
        case 'ErrorViewDetails':
          Swal.fire({
            icon: 'error',
            iconColor: 'red',
            confirmButtonColor: 'red',
            background: '#191919',
            color: 'white',
            template: '#my-template',
            title: data
          })
          break
      }
    },
    async login() {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${this.baseUrl}login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        this.fetchCuisines()
        this.router.push('/')
        this.isLogin = true
        this.username = data.username
        this.email = data.email
        this.swalFire('LoginSuccess', 'login success')
      } catch (err) {
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async register() {
      try {
        const { data } = await axios({
          method: 'post',
          url: `${this.baseUrl}register`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            address: this.address
          }
        })
        this.swalFire('RegisterSuccess', 'register success')
        this.username = ''
        this.email = ''
        this.password = ''
        this.phoneNumber = ''
        this.address = ''
        this.router.push('/login')
      } catch (err) {
        this.swalFire('RegisterError', err.response.data.message)
      }
    },
    async fetchCuisines(payload) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}cuisines`,
          params: payload
        })
        this.cuisines = data.cuisine
        this.totalCuisines = data.totalCuisines
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCuisineWithDetails(value, origin) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}cuisines/${value}`,
          params: {
            origin
          }
        })

        this.cuisinesWithId.name = data.name
        this.cuisinesWithId.description = data.description
        this.cuisinesWithId.price = data.price
        this.cuisinesWithId.imgUrl = data.imgUrl
        this.cuisinesWithId.author = data.User.username
        this.cuisinesWithId.category = data.Category.name
        this.cuisinesWithId.qrCodeUrl = data.qrcode
      } catch (err) {
        this.router.push('/NotFound')
        this.swalFire('ErrorViewDetails', err.response.data.message)
      }
    },
    async googleLogin(googleCredential) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}google-sign-in`,
          headers: {
            google_access_token: googleCredential
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('email', data.user.email)

        this.fetchCuisines()
        this.router.push('/')
        this.isLogin = true
        this.swalFire('LoginSuccess', 'login success')
      } catch (err) {
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async fetchFavorites() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}favorites`,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.favorites = data
      } catch (err) {
        console.log(err)
      }
    },
    async addMyFavorite(value) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}favorites/${value}`,
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.fetchFavorites()
        this.swalFire('SuccessAddedFavorite', 'success added to favorite')
      } catch (err) {
        this.swalFire('ErrorAddedFavorite', err.response.data.message)
      }
    }
  }
})
