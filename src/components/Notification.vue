<template>
  <div class="notification" :class="className">
    <div class="notification-text">{{ message }}</div>
    <div v-if="showRedirect" class="notification-text">
      You'll be redirected in 4 seconds.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
    message: {
      type: String,
    },
    showRedirect: {
      type: Boolean,
    },
  },
  data() {
    return {
      countdown: null,
    };
  },
};
</script>

<style scoped></style>
