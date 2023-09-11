<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay update-store"
  >
    <div class="form-container">
      <form @submit.prevent="updateCurrentStore">
        <label for="store-name">Store Name</label>
        <input
          v-model="updatedStore.name"
          type="text"
          id="store-name"
          name="store-name"
          class="store-name"
          required
        />
        <label for="store-address">Store Address</label>
        <input
          v-model="updatedStore.address"
          type="text"
          id="store-address"
          name="store-address"
          class="store-address"
          required
        />
        <label for="store-address">Store Email</label>
        <input
          v-model="updatedStore.email"
          type="email"
          id="store-email"
          name="store-email"
          class="store-email"
          @input="validateEmail"
          required
        />
        <span v-if="!emailIsValid" style="color: red"
          >Email input is invalid.</span
        >
        <label for="store-contact">Store Contact Number</label>
        <input
          v-model="updatedStore.contact_number"
          type="text"
          id="store-contact"
          name="store-contact"
          class="store-contact"
          @input="validateContactNumber"
          required
        />
        <span v-if="!contactIsValid" style="color: red"
          >Contact Number input is invalid.</span
        >
        <label for="store-owner">Store Owner</label>
        <input
          v-model="updatedStore.owner"
          type="text"
          id="store-owner"
          name="store-owner"
          class="store-owner"
          @input="validateOwner"
          required
        />
        <span v-if="!ownerIsValid" style="color: red"
          >Owner Name input is invalid.</span
        >
        <button type="submit" :disabled="!isFormValid">Update Store</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updateStore, loadAndParseStoreJSON } from "../composables/mockstore";
export default {
  props: [
    "storeIdToUpdate",
    "storeNameToUpdate",
    "storeAddressToUpdate",
    "storeEmailToUpdate",
    "storeContactNumberToUpdate",
    "storeOwnerToUpdate",
  ],
  data() {
    return {
      updatedStore: {
        name: this.storeNameToUpdate,
        address: this.storeAddressToUpdate,
        email: this.storeEmailToUpdate,
        contact_number: this.storeContactNumberToUpdate,
        owner: this.storeOwnerToUpdate,
      },
      emailIsValid: true,
      contactIsValid: true,
      ownerIsValid: true,
      isFormValid: false,
    };
  },
  methods: {
    async updateCurrentStore() {
      const update = await updateStore(this.storeIdToUpdate, this.updatedStore);
      this.$emit("store-updated");
    },
    validateEmail() {
      const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailIsValid = emailRegexp.test(this.updatedStore.email);

      this.updateFormValidity();
    },
    validateContactNumber() {
      const contactRegExp = /^\d+(?:-\d+)*$/;
      this.contactIsValid = contactRegExp.test(
        this.updatedStore.contact_number
      );

      this.updateFormValidity();
    },
    validateOwner() {
      const ownerRegExp = /^[A-Za-z\s]+(?:\.[A-Za-z\s]+)?(?:,[A-Za-z\s]+)*$/;
      this.ownerIsValid = ownerRegExp.test(this.updatedStore.owner);

      this.updateFormValidity();
    },
    updateFormValidity() {
      if (this.emailIsValid && this.contactIsValid && this.ownerIsValid) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    },
  },
};
</script>

<style scoped>
.form-container {
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
