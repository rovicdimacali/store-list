<template>
  <div class="container">
    <div v-for="store in stores" :key="store.id" class="store">
      <h1>{{ store.name }}</h1>
    </div>
  </div>
</template>

<script>
import { loadAndParseStoreJSON } from "./composables/mockstore";
export default {
  data() {
    return {
      stores: [],
    };
  },
  async mounted() {
    this.stores = await loadAndParseStoreJSON();
  },
};
</script>

<style></style>
