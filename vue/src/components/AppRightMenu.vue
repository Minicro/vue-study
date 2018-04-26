<template>
  <div id="AppRightMenu" v-bind:style="{ top: top + 'px', left: left + 'px' }" v-if="isDsplayRightMenu" >
    <Dropdown trigger="custom" :visible="visible" placement="bottom-end">
        <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  id: 'AppRightMenu',
  name: 'AppRightMenu',
  props:
  {
    'top': {
      type: Number,
      default: 0,
      required: true,
      validator: function(value) {
        return value >= 0;
      }
    },
    'left': {
      type: Number,
      default: 0,
      required: true,
      validator: function(value) {
        return value >= 0;
      }
    },
    'isDsplayRightMenu': {
      type: Boolean
    }
  },
  created: function() {
    console.log(this.top + "|" + this.left);
  },

  data: function() {
    return {
      visible: true
    }
  }
}
</script>
<style scoped>
#AppRightMenu {
  position: fixed;
  z-Index: 1;
  opacity: 1;
  background-color: green;
}
</style>
