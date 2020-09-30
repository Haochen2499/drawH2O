<template>
  <div>
    <div v-click-outside="hide" @click="toggle" v-if="show">Toggle</div>
    <div v-show="opened">Popup item</div>
    <div class="open" @click="show = !show">open</div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  data() {
    return {
      opened: false,
      show: true
    };
  },

  methods: {
    toggle() {
      this.opened = true;
    },

    hide() {
      console.log("hide");
      this.opened = false;
    }
  },

  mounted() {
    // prevent click outside event with popupItem.
  },

  // do not forget this section
  directives: {
    ClickOutside
  }
};
</script>
