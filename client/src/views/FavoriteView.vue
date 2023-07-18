<script>
import FavoriteCuisineCard from '../components/FavoriteCuisineCard.vue'
import { useCuisineStore } from '../stores/cuisineStore'
import { mapState } from 'pinia'
export default {
  components: {
    FavoriteCuisineCard
  },
  computed: {
    ...mapState(useCuisineStore, ['favorites'])
  }
}
</script>

<template>
  <div class="container" style="margin-top: 150px; max-width: 90%">
    <div class="row">
      <div class="col-3 mt-4"></div>
      <div class="col-9">
        <div class="row">
          <FavoriteCuisineCard
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorite="favorite"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
