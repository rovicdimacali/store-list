<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay add-store"
  >
    <div class="form-container">
      <form @submit.prevent="addNewStore">
        <label for="store-name">Store Name</label>
        <input
          v-model="newStore.name"
          type="text"
          id="store-name"
          name="store-name"
          class="store-name"
          required
        />
        <label for="store-address">Store Address</label>
        <input
          v-model="newStore.address"
          type="text"
          id="store-address"
          name="store-address"
          class="store-address"
          required
        />
        <label for="store-address">Store Email</label>
        <input
          v-model="newStore.email"
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
          v-model="newStore.contact_number"
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
          v-model="newStore.owner"
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
        <div class="actions">
          <button
            class="cancel-btn"
            @click="
              () => {
                this.$emit('close');
              }
            "
          >
            Cancel
          </button>
          <button type="submit" :disabled="!isFormValid">Add Store</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { addStore } from "../composables/mockstore";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      newStore: {
        id: uuidv4(),
        name: "",
        address: "",
        email: "",
        contact_number: "",
        owner: "",
        isExpanded: false,
      },
      emailIsValid: true,
      contactIsValid: true,
      ownerIsValid: true,
      isFormValid: "false",
    };
  },
  methods: {
    async addNewStore() {
      const newStore = await addStore(this.newStore);
      this.$emit("store-added", newStore);
      this.resetinput();
    },
    restoreFormState() {
      const savedFormState = JSON.parse(localStorage.getItem("newStore"));
      if (savedFormState) {
        this.newStore = savedFormState;
      }
    },
    saveFormState() {
      localStorage.setItem("newStore", JSON.stringify(this.newStore));
    },
    resetinput() {
      this.newStore.id = uuidv4();
      this.newStore.name = "";
      this.newStore.address = "";
      this.newStore.email = "";
      this.newStore.contact_number = "";
      this.newStore.owner = "";
      this.newStore.isExpanded = false;
    },
    validateEmail() {
      const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailIsValid = emailRegexp.test(this.newStore.email);
      this.updateFormValidity();
    },
    validateContactNumber() {
      const contactRegExp = /^\d+(?:-\d+)*$/;
      this.contactIsValid = contactRegExp.test(this.newStore.contact_number);
      this.updateFormValidity();
    },
    validateOwner() {
      const ownerRegExp = /^[A-Za-z\s]+(?:\.[A-Za-z\s]+)?(?:,[A-Za-z\s]+)*$/;
      this.ownerIsValid = ownerRegExp.test(this.newStore.owner);

      this.updateFormValidity();
    },
    updateFormValidity() {
      if (
        this.emailIsValid &&
        this.contactIsValid &&
        this.ownerIsValid &&
        this.newStore.name &&
        this.newStore.address &&
        this.newStore.email &&
        this.newStore.contact_number &&
        this.newStore.owner
      ) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    },
  },
  mounted() {
    this.restoreFormState();
    this.updateFormValidity();
  },
  unmounted() {
    this.saveFormState();
  },
};
</script>

<style scoped></style>
