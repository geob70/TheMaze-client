<template>
  <div>
    <div>
      <canvas ref="game" width="1200" height="600"></canvas>
      <p>Direction: {{ movement }}</p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
// import Cell from "../objects/Cell";
// import mazeGenerator from "../algorithm/MazeGenerator";
export default {
  name: "Block",
  data() {
    return {
      player: null,
      direction: null,
      grid: [],
      socket: {},
      position1: {
        x: 126,
        y: 126,
      },
      position2: {
        x: 6,
        y: 6,
      },
    };
  },
  computed: {
    movement() {
      return this.direction;
    },
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    // let row = Math.floor(this.$refs.game.width / 24);
    // let col = Math.floor(this.$refs.game.height / 12);
    // this.socket.emit("get", { row: row, col: col });
    window.addEventListener("keyup", (event) => {
      this.socket.emit("move", this.player, event.key);
      this.socket.emit("direction", event.key);
    });
    this.player = this.$route.query.position;
    this.grid = this.$route.query.grid;
    this.context = this.$refs.game.getContext("2d");
    this.createCanvas();
    this.socket.on("direction", (data) => {
      this.direction = data;
    });
    this.socket.on("runner", (data) => {
      // let box = this.getGrid(data);
      // if (this.canMove(box, this.direction)) {
      this.context.clearRect(this.position1.x, this.position1.y, 12, 12);
      this.context.stroke();
      this.position1 = data;
      this.context.fillRect(this.position1.x, this.position1.y, 12, 12);
      this.context.fillRect(this.position2.x, this.position2.y, 12, 12);
      // } else {
      //   this.socket.emit("nullify", this.player, this.position1);
      // }
    });
    this.socket.on("chaser", (data) => {
      this.context.clearRect(this.position2.x, this.position2.y, 12, 12);
      this.context.stroke();
      this.position2 = data;
      this.context.fillRect(this.position1.x, this.position1.y, 12, 12);
      this.context.fillRect(this.position2.x, this.position2.y, 12, 12);
    });
  },
  methods: {
    createCanvas() {
      let row = 50;
      let col = 50;
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          this.drawMaze(this.grid[i][j]);
        }
      }
    },
    drawMaze(cell) {
      let x = cell.c * 24;
      let y = cell.r * 24;
      if (cell.hasWall.top) {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 24, y);
        this.context.stroke();
      }
      if (cell.hasWall.right) {
        this.context.beginPath();
        this.context.moveTo(x + 24, y);
        this.context.lineTo(x + 24, y + 24);
        this.context.stroke();
      }
      if (cell.hasWall.bottom) {
        this.context.beginPath();
        this.context.moveTo(x + 24, y + 24);
        this.context.lineTo(x, y + 24);
        this.context.stroke();
      }
      if (cell.hasWall.left) {
        this.context.beginPath();
        this.context.moveTo(x, y + 24);
        this.context.lineTo(x, y);
        this.context.stroke();
      }
    },
    getGrid(index) {
      // let l = Math.floor(this.$refs.game.height / 24);
      let i = index.x;
      let j = index.y;
      i = (i - 6) / 24;
      j = (j - 6) / 24;
      return this.grid[j][i];
    },
    canMove(box, direction) {
      const wall = box.hasWall;
      if (direction === "ArrowLeft") {
        if (wall.left) return false;
        else return true;
      } else if (direction === "ArrowUp") {
        if (wall.up) return false;
        else return true;
      } else if (direction === "ArrowRight") {
        if (wall.right) return false;
        else return true;
      } else if (direction === "ArrowDown") {
        if (wall.down) return false;
        else return true;
      }
    },
  },
};
</script>

<style></style>
