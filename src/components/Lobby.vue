<template>
  <div>
    <span>Waiting for player</span>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: {}
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.socket.emit("hey");
    this.socket.on("maze", grid => {
      if (grid !== false) {
        let data = {
          position: this.$route.query.position,
          grid: grid
        };
        this.$router.push({
          path: "/game",
          query: data
        });
      }
    });
  }
};
</script>