<template>
  <transition name="h-modal">
    <div
      class="h-modal-wrap"
      v-if="isShow"
      @click.self="closeModal"
      :style="{ transition: transitionValue, zIndex: 1000 + zIndexOffset }"
      @touchmove="handleScroll"
    >
      <div class="h-modal-content" :style="{ transition: transitionValue }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * @param {Boolean} value 是否展示，通过v-modal绑定
 * @param {Number} time 渐变时间，单位ms
 * @param {Boolean} hideOnBlur 点击遮罩层是否关闭弹窗，默认true
 * @event on-show
 * @event on-hide
 */
export default {
  name: "hModal",
  props: {
    value: {
      type: Boolean
    },
    time: {
      type: Number,
      default: () => {
        return 250;
      }
    },
    hideOnBlur: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    disableScroll: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    zIndexOffset: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      isShow: this.value
    };
  },
  computed: {
    transitionValue() {
      return `all ${this.time / 1000}s ease`;
    }
  },
  watch: {
    value(val) {
      this.isShow = val;
    },
    isShow(val) {
      this.$emit("input", val);
      if (val) {
        this.$emit("on-show");
      } else {
        this.$emit("on-hide");
      }
    }
  },
  methods: {
    closeModal() {
      if (this.hideOnBlur) {
        this.isShow = false;
      }
    },
    handleScroll(e) {
      if (this.disableScroll) {
        console.log("prevent scroll");
        e.preventDefault();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.h-modal-enter,
.h-modal-leave-to {
  opacity: 0 !important;
  .h-modal-content {
    transform: translate(-50%, -50%) scale(0.8) !important;
  }
}
.h-modal-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  .h-modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
