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

<style scoped>
.notification {
  position: fixed;
  top: -70px;
  width: 300px;
  padding: 20px;
  background: rgb(34, 131, 34);
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  transition: all 0.5s;
}

.active {
  top: 10px;
  transition: all 0.5s;
}

.notification .notification-text {
  color: white;
}
</style>
