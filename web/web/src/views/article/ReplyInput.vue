<template>
  <div class="reply-input">
    <Input
      v-model="currentInput"
      maxlength="100"
      show-word-limit
      type="textarea"
      placeholder="请输入评论"
    />
    <div class="reply-buttons">
      <Icon
        class="emoji-trigger"
        type="md-happy"
        @click="showEmoji = !showEmoji"
      />
      <Button type="primary" :disabled="!currentInput" @click="handleSubmit"
        >评论</Button
      >
    </div>
    <Picker
      v-if="showEmoji"
      set="apple"
      @select="handleEmoji"
      :showPreview="false"
      :showSearch="false"
      :showSkinTones="false"
      :showCategories="false"
      :native="true"
      class="emoji-picker"
      :include="['people']"
      v-click-outside="e => hideEmoji(e)"
    ></Picker>
  </div>
</template>

<script>
import { Input, Icon, Button } from "view-design";
import { Picker } from "emoji-mart-vue";
export default {
  name: "ReplyInput",
  components: { Input, Icon, Button, Picker },
  props: {},
  data() {
    return {
      currentInput: "",
      showEmoji: false
    };
  },
  methods: {
    handleEmoji(val) {
      this.currentInput += val.native;
    },
    handleSubmit() {
      this.$emit("onSubmit", this.currentInput);
    },
    hideEmoji(e) {
      if (e.target.className.indexOf("emoji-trigger") !== -1) {
        return;
      }
      this.showEmoji = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/reset.scss";
.reply-input {
  position: relative;
  .reply-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    .emoji-trigger {
      color: #999;
      font-size: 25px;
      padding-right: 20px;
      cursor: pointer;
      &:hover {
        color: $main-color;
      }
    }
  }
}
.emoji-picker {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(calc(100% + 10px));
  z-index: 1;
}
</style>
