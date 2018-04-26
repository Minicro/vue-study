<template>
  <transition>
    <div id="AppToolBox" @click.right.prevent.stop>
      <div class="toolboxHeader" @mousedown="onMousedown" @mouseup="onMouseup"></div>
      <div class="toolboxContent">
        icon db
        <div v-for="toolbox in getToolBox" :key="toolbox.key" :id="toolbox.key">{{ toolbox.key }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppToolBox',
  /* 以下は位置 */
  posBeforeX: 0,
  posBeforeY: 0,
  posAfterX: 0,
  posAfterY: 0,
  data() {
    return {

    }
  },
  computed: {

    getToolBox: function() {
      console.log(this.$http.gethToolBox);
      return this.$http.gethToolBox;
    }
  },
  mounted() {
    this.$el.style.top = 10 + 'px';
    this.$el.style.left = 10 + 'px';
  },
  methods: {
    onMousedown: function(e) {
      e = e || window.event;
      this.posAfterX = e.clientX;
      this.posAfterY = e.clientY;
      this.$root.$el.addEventListener('mousemove', this.onMousemove, true);
    },
    onMouseup: function(e) {
      this.posBeforeX = 0;
      this.posBeforeY = 0;
      this.posAfterX = 0;
      this.posAfterY = 0;
      this.$root.$el.removeEventListener('mousemove', this.onMousemove, true);
    },
    onMousemove: function(e) {
      e = e || window.event;
      this.posBeforeX = this.posAfterX - e.clientX;
      this.posBeforeY = this.posAfterY - e.clientY;
      this.posAfterX = e.clientX;
      this.posAfterY = e.clientY;
      this.$el.style.top = (this.$el.offsetTop - this.posBeforeY) + 'px';
      this.$el.style.left = (this.$el.offsetLeft - this.posBeforeX + 'px');
    },
  }
}
</script>

<style scoped>
#AppToolBox {
  width: 100px;
  height: auto;
  position: fixed;
  z-index: 9;
}
#AppToolBox .toolboxHeader {
  height: 20px;
  background-color: blue;
    border: 1px solid black;
  cursor: move;
  z-index: 10;
}

#AppToolBox .toolboxContent {
  height: 160px;
  border: 1px solid black;
  z-index: 10;
}
</style>
