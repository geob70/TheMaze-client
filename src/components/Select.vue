<template>
  <div>
    <span>Do you choose to be the runner</span>
    <button @click="choose(true)">yes</button>
    <button @click="choose(false)">no</button>
  </div>
</template>
<script>
export default {
  methods: {
    choose(response) {
      if (response) {
        let data = {
          position: "runner"
        };
        this.$router.push({
          path: "/lobby",
          query: data
        });
      } else {
        let data = {
          position: "chaser"
        };
        this.$router.push({
          path: "/lobby",
          query: data
        });
      }
    }
  }
};
</script>