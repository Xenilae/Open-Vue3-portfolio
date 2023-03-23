<script>
export default {};
</script>

<template>
  <div class="text-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.text-container {
  background: $container-bg;
  padding: 10px 15px;
  border-radius: 5px;
}
</style>