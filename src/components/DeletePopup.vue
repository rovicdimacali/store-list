<template>
  <div
    @click.self="
      () => {
        this.$emit('close-popup');
      }
    "
    class="overlay"
  >
    <div class="modal">
      <h2>Are you sure you want to delete {{ storeNameToDelete }}?</h2>
      <button @click="removeItem(storeIdToDelete)">Yes</button>
      <button
        @click.self="
          () => {
            this.$emit('close-popup');
          }
        "
      >
        No
      </button>
    </div>
  </div>
</template>

<script>
import { deleteStore } from "../composables/mockstore";
export default {
  props: ["storeIdToDelete", "storeNameToDelete"],
  methods: {
    async removeItem(storeId) {
      console.log(storeId);
      const removeStoreId = await deleteStore(storeId);
      this.$emit("delete-store", removeStoreId);
      //this.stores = this.stores.filter((store) => store.id !== removeStoreId);
    },
  },
};
</script>

<style scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
}

.overlay {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
</style>
