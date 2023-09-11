<template>
  <div class="container">
    <div v-for="store in stores" :key="store.id" class="store">
      <h1>{{ store.name }}</h1>
      <button @click="removeItem(store.id)">delete</button>
    </div>
  </div>
</template>

<script>
import { loadAndParseStoreJSON, deleteStore } from "./composables/mockstore";
export default {
  data() {
    return {
      stores: [],
    };
  },
  methods: {
    async removeItem(itemId) {
      const removeStoreId = await deleteStore(itemId);
      this.stores = this.stores.filter((store) => store.id !== removeStoreId);
    },
  },
  async mounted() {
    this.stores = await loadAndParseStoreJSON();
  },
};
</script>

<style></style>
