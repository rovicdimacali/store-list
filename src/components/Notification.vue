<template>
  <div class="notification" :class="className">
    <div class="notification-text">{{ message }}</div>
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
  },
};
</script>

<style scoped></style>
