<template>
  <div class="loading-bar-container">
    <div class="loading-bar"></div>
  </div>
</template>

<style scoped>
.loading-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #f3f3f3;
}

.loading-bar {
  width: 100%;
  height: 100%;
  background-color: #3498db;
  animation: loading 2s linear infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
