<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      property: "value",
    };
  },
  mounted() {
    // this.$router.push({ path: "/Home" });
  },
};
</script>
<style></style>
