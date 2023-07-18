<script>
import { mapState, mapActions } from 'pinia'
import { useCuisineStore } from '../stores/cuisineStore'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState(useCuisineStore, ['cuisinesWithId'])
  },
  methods: {
    ...mapActions(useCuisineStore, ['fetchCuisineWithDetails'])
  },
  created() {
    this.fetchCuisineWithDetails(this.id)
  }
}
</script>

<template>
  <div style="margin-top: 150px">
    <div class="card text-center">
      <div class="card-header">{{ cuisinesWithId.name }}</div>
      <div class="card-body">
        <img
          class="card-img-top"
          :src="cuisinesWithId.imgUrl"
          style="max-width: 200px; height: auto"
        />
        <h5 class="card-title">{{ cuisinesWithId.description }}</h5>
        <p class="card-text">
          {{ cuisinesWithId.price }}
        </p>
        <div class="col-2">
          <div v-html="cuisinesWithId.qrCodeUrl" style=""></div>
        </div>
      </div>
      <div class="card-footer text-muted">{{ 'atuhor: ' + cuisinesWithId.author }}</div>
    </div>
  </div>
</template>

<style scoped></style>
