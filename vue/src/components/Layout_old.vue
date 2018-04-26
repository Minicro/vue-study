<template>
  <div id="MainContainer" class="container" @click.right.prevent="displayMenu" @click.left.prevent="disappearMenu">
    <div>
      <p>{{ msg }}</p>
    </div>
    <app-right-menu :isDsplayRightMenu="isDsplayRightMenu" :top="top" :left="left"></app-right-menu>
    <app-tool-box></app-tool-box>
  </div>
</template>

<script>
import Vue from 'vue';
import AppRightMenu from "./AppRightMenu.vue";
import AppToolBox from './AppToolBox.vue';

export default {
  name: 'Layout',
  components: {
    AppRightMenu,
    AppToolBox
  },
  data () {
    return {
      msg: 'WorkSpace',
      isDsplayRightMenu: false,
      top: 0,
      left: 0,
    }
  },
  mounted() {
  },
  methods: {
    displayMenu: function(e) {
      console.log(e.currentTarget);
      this.top = e.clientY;
      this.left = e.clientX;
      this.isDsplayRightMenu = true;
    },
    disappearMenu: function(e) {
      console.log(e.currentTarget);
      console.log(e.target.id + "|" + AppRightMenu.id);
      if (e.target.id === AppRightMenu.id) {
        return;
      }
      this.isDsplayRightMenu = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: grey;
  z-index: 0;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

p {
  display: inline-block;
  text-align: center;
  font-size: 9em;
  mask-type: alpha;
  pointer-events: none;
  user-select: none;
}
</style>
