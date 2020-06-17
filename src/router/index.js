import Vue from "vue";
import Router from "vue-router";

import Game from "../components/BlockGame.vue";
import Select from "../components/Select.vue";
import Lobby from "../components/Lobby.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/game",
      component: Game,
    },
    {
      path: "/",
      component: Select,
    },
    {
      path: "/lobby",
      component: Lobby,
    },
  ],
});
