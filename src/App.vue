<template>
  <div class="container">
    <AddStore
      v-if="showModal"
      @close="toggleAddStore"
      @store-added="handleStoreAdded"
    />
    <DeletePopup
      v-if="showDeletePopup"
      @close-popup="toggleDeletePopup"
      :storeIdToDelete="storeIdToDelete"
      :storeNameToDelete="storeNameToDelete"
      @delete-store="handleStoreDeleted"
    />
    <UpdateStore
      v-if="showUpdatePopup"
      @close="toggleUpdateStore"
      :storeIdToUpdate="storeIdToupdate"
      :storeNameToUpdate="storeNameToUpdate"
      :storeAddressToUpdate="storeAddressToUpdate"
      :storeEmailToUpdate="storeEmailToUpdate"
      :storeContactNumberToUpdate="storeContactNumberToUpdate"
      :storeOwnerToUpdate="storeOwnerToUpdate"
    />
    <div v-for="store in stores" :key="store.id" class="store">
      <h1>{{ store.name }}</h1>
      <button @click="toggleDeletePopup(store.id, store.name)">delete</button>
      <button
        @click="
          toggleUpdateStore(
            store.id,
            store.name,
            store.address,
            store.email,
            store.contact_number,
            store.owner
          )
        "
      >
        update
      </button>
    </div>
    <button @click="toggleAddStore" v-if="!showModal" class="add-store-btn">
      Add Store
    </button>
  </div>
</template>

<script>
import { loadAndParseStoreJSON } from "./composables/mockstore";
import AddStore from "./components/AddStore.vue";
import DeletePopup from "./components/DeletePopup.vue";
import UpdateStore from "./components/UpdateStore.vue";
export default {
  components: { AddStore, DeletePopup, UpdateStore },
  data() {
    return {
      stores: [],
      showModal: false,
      showDeletePopup: false,
      showUpdatePopup: false,
      // variables to delete //
      storeIdToDelete: "",
      storeNameToDelete: "",
      // variables to update //
      storeIdToupdate: "",
      storeNameToUpdate: "",
      storeAddressToUpdate: "",
      storeEmailToUpdate: "",
      storeContactNumberToUpdate: "",
      storeOwnerToUpdate: "",
    };
  },
  methods: {
    toggleAddStore() {
      this.showModal = !this.showModal;
    },
    toggleDeletePopup(storeID, storeName) {
      this.showDeletePopup = !this.showDeletePopup;
      this.storeIdToDelete = storeID;
      this.storeNameToDelete = storeName;
    },
    toggleUpdateStore(
      storeID,
      storeName,
      storeAddress,
      storeEmail,
      storeContactNumber,
      storeOwner
    ) {
      this.showUpdatePopup = !this.showUpdatePopup;
      this.storeIdToupdate = storeID;
      this.storeNameToUpdate = storeName;
      this.storeAddressToUpdate = storeAddress;
      this.storeEmailToUpdate = storeEmail;
      this.storeContactNumberToUpdate = storeContactNumber;
      this.storeOwnerToUpdate = storeOwner;
    },
    handleStoreAdded(newStore) {
      this.stores.push(newStore);
      this.showModal = !this.showModal;
    },
    handleStoreDeleted(removeStoreId) {
      this.stores = this.stores.filter((store) => store.id !== removeStoreId);
      this.showDeletePopup = !this.showDeletePopup;
    },
  },
  async mounted() {
    this.stores = await loadAndParseStoreJSON();
  },
};
</script>

<style>
.add-store-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: black;
  color: white;
  padding: 10px;
  cursor: pointer;
}
</style>
