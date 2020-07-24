<template>
  <div class="wrap">
    <quill-editor
      style="width: 70vw"
      v-model="content"
      ref="editor"
      :options="editorOption"
    ></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import ImageResize from "quill-image-resize-module";

Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/ImageResize", ImageResize);

export default {
  name: "test",
  components: { quillEditor },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "清在这里输入",
        modules: {
          ImageResize: {},
          ImageExtend: {
            loading: true,
            size: 1,
            name: "file",
            action: "/api/upload/image",
            sizeError: () => this.$Message.error("图片大小不得超过1M"),
            onError: () => this.$Message.error("上传失败"),
            response: res => {
              return this.imgUrl(res.data.url);
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods: {
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    }
  }
};
</script>

<style lang="scss" scoped></style>
