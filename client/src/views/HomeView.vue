<script>
import { mapActions, mapState } from 'pinia'
import CuisineCard from '../components/CuisineCard.vue'
import { useCuisineStore } from '../stores/cuisineStore'
import { ref } from 'vue'
export default {
  components: {
    CuisineCard
  },
  computed: {
    ...mapState(useCuisineStore, ['cuisines', 'totalCuisines'])
  },
  methods: {
    ...mapActions(useCuisineStore, ['fetchCuisines']),
    onClickHandler(page) {
      this.fetchCuisines({ page })
    },
    searchCuisine() {
      this.options.filterBy = this.searchKeyword
      this.fetchCuisines(this.options)
    },
    removeFilterSearch() {
      delete this.options.filterBy
      this.searchKeyword = ''
      this.fetchCuisines(this.options)
    }
  },
  created() {
    this.fetchCuisines(this.options)
  },
  data() {
    return {
      currentPage: ref(1),
      options: {
        page: 1
      },
      searchKeyword: ''
    }
  }
}
</script>

<template>
  <div class="container" style="margin-top: 150px; max-width: 90%">
    <div class="row">
      <div class="col-3 mt-4">
        <div
          class="card mx-auto"
          style="max-width: 200px; max-height: 300px; background-color: #191919"
        >
          <div class="card-header text-center">
            <h3 class="mt-2 text-white" style="margin-bottom: 25px">Find</h3>
          </div>
          <div class="card-body">
            <form class="form" @submit.prevent="searchCuisine">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Cuisine"
                  v-model="searchKeyword"
                  @click.prevent="removeFilterSearch"
                />
                <label for="floatingInput">Cuisine name</label>
              </div>
              <div>
                <button
                  type="submit"
                  class="btn float-end"
                  style="background-color: #fe0002; color: white"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-9">
        <vue-awesome-paginate
          :total-items="totalCuisines"
          :items-per-page="9"
          :max-pages-shown="3"
          v-model="currentPage"
          :on-click="onClickHandler"
        />
        <div class="row">
          <CuisineCard
            v-for="cuisine in cuisines"
            :key="cuisine.id"
            :cuisine="cuisine"
            @click.prevent="$router.push(`/cuisines/${cuisine.id}`)"
            style="cursor: pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
