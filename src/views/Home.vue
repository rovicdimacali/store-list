<template>
  <div class="container">
    <Notification :class-name="notification" :message="notificationMessage" />
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
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      class="search-input"
    />
    <div class="table-container">
      <table>
        <thead class="table-header">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="store in filteredStores" :key="store.id" class="store">
            <th>
              <RouterLink
                :to="{
                  name: 'Update',
                  params: {
                    storeIdToUpdate: store.id,
                    storeNameToUpdate: store.name,
                    storeAddressToUpdate: store.address,
                    storeEmailToUpdate: store.email,
                    storeContactNumberToUpdate: store.contact_number,
                    storeOwnerToUpdate: store.owner,
                  },
                }"
                >{{ store.name }}</RouterLink
              >
            </th>
            <th class="shaded">{{ store.address }}</th>
            <th>{{ store.email }}</th>
            <th class="shaded">{{ store.contact_number }}</th>
            <th>{{ store.owner }}</th>
            <th class="shaded">
              <button @click="toggleDeletePopup(store.id, store.name)">
                Delete
              </button>
            </th>
          </tr>
          <tr v-if="searchResultsEmpty" style="text-align: center">
            No Data Available.
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mobile-view-container">
      <div class="store-container">
        <div class="store-title">Store</div>
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="store-content"
          :class="{ expanded: store.isExpanded }"
          @click="store.isExpanded = !store.isExpanded"
        >
          <div class="store-item row">
            <div class="store-name">{{ store.name }}</div>
            <fa
              icon="chevron-right"
              class="chevron-right"
              :class="{ expanded: store.isExpanded }"
            />
          </div>
          <div class="row wrap">
            <div class="row address-container">
              <label>Address:</label>
              <div class="add-info store-address">{{ store.address }}</div>
            </div>
            <div class="row email-container">
              <label>Email:</label>
              <div class="add-info store-email">{{ store.email }}</div>
            </div>
            <div class="row contact-container">
              <label>Contact Number:</label>
              <div class="add-info store-contact">
                {{ store.contact_number }}
              </div>
            </div>
            <div class="row owner-container">
              <label>Owner:</label>
              <div class="add-info store-owner">{{ store.owner }}</div>
            </div>
          </div>
          <div class="actions row">
            <RouterLink
              :to="{
                name: 'Update',
                params: {
                  storeIdToUpdate: store.id,
                  storeNameToUpdate: store.name,
                  storeAddressToUpdate: store.address,
                  storeEmailToUpdate: store.email,
                  storeContactNumberToUpdate: store.contact_number,
                  storeOwnerToUpdate: store.owner,
                },
              }"
              ><div class="update-btn">Update</div></RouterLink
            >
            <button
              class="delete-btn"
              @click="toggleDeletePopup(store.id, store.name)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <button @click="toggleAddStore" v-if="!showModal" class="add-store-btn">
      Add Store
    </button>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { loadAndParseStoreJSON } from "../composables/mockstore";
import AddStore from "../components/AddStore.vue";
import DeletePopup from "../components/DeletePopup.vue";
import Notification from "../components/Notification.vue";

export default {
  components: { AddStore, DeletePopup, Notification },
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
      isExpanded: false,
      notification: "",
      notificationMessage: "",
      searchQuery: "",
      searchResultsEmpty: false,
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
    toggleNotification() {
      this.notification = "active";
      setTimeout(() => {
        this.notification = "";
      }, 4000);
    },
    handleStoreAdded(newStore) {
      this.stores.push(newStore);
      this.showModal = !this.showModal;
      this.notificationMessage = "Store Added!";
      this.toggleNotification();
    },
    handleStoreDeleted(removeStoreId) {
      this.stores = this.stores.filter((store) => store.id !== removeStoreId);
      this.showDeletePopup = !this.showDeletePopup;
      this.notificationMessage = "Store Deleted!";
      this.toggleNotification();
    },
    handleStoreUpdated() {
      this.notificationMessage = "Store Updated!";
      this.toggleNotification();
    },
  },
  async mounted() {
    this.stores = await loadAndParseStoreJSON();
  },
  computed: {
    filteredStores() {
      const filteredStores = this.stores.filter((store) => {
        // Perform case-insensitive search on store name, address, email, and owner fields
        const searchFields = [
          store.name,
          store.address,
          store.email,
          store.owner,
        ];

        return searchFields.some((field) =>
          field.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });

      this.searchResultsEmpty = filteredStores.length === 0;

      return filteredStores;
    },
  },
};
</script>

<style></style>
