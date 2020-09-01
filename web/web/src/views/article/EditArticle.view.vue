<template>
  <div class="container">
    <div
      class="cover-wrap"
      :style="{ backgroundImage: `url(${imgUrl(form.coverUrl)})` }"
    >
      <label for="cover" class="upload-wrap">
        <p v-if="!form.coverUrl">上传封面图</p>
      </label>
      <input
        @change="e => handleUpload(e)"
        type="file"
        id="cover"
        accept=".jpe, .jpeg, .png"
      />
    </div>
    <Form :label-width="80" label-position="left" class="form">
      <FormItem label="标题">
        <Input v-model="form.title" maxlength="20"></Input>
        <p class="text-length-tip">{{ form.title.length }}/20</p>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="form.desc" maxlength="50"></Input>
        <p class="text-length-tip">{{ form.desc.length }}/50</p>
      </FormItem>
    </Form>
    <quill-editor
      v-model="form.content"
      ref="editor"
      :options="editorOption"
    ></quill-editor>
    <div class="bottom">
      <Button v-if="form.isDraft" type="default" @click="handleSubmit(true)"
        >存入草稿箱</Button
      >
      <Button type="primary" @click="handleSubmit(false)">发布</Button>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";

import { Form, FormItem, Input, Button } from "view-design";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import ImageResize from "quill-image-resize-module";
import Upload from "@utils/upload";
import fetch from "@utils/fetch";
import _ from "lodash";

Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/ImageResize", ImageResize);

export default {
  name: "EditArticle",
  components: { quillEditor, Form, FormItem, Input, Button },
  data() {
    return {
      form: {
        id: null,
        title: "",
        desc: "",
        content: "",
        coverUrl: "",
        isDraft: true
      },
      editorOption: {
        placeholder: "请在这里输入",
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
            container,
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
  created() {
    const { params } = this.$route;
    if (!_.isEmpty(params)) {
      const { id, title, desc, content, coverUrl, isDraft } = params;
      Object.assign(this.form, { id, title, desc, content, coverUrl, isDraft });
    }
  },
  methods: {
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    },
    async handleUpload(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const size = file.size / 1024; // 单位 kb
      const limit = 600;
      if (size > limit) {
        this.$Message.error(`文件大小不能大于${limit}KB`);
        return;
      }
      const res = await Upload(file);
      console.log(res);
      if (res) {
        this.form.coverUrl = res;
      }
    },
    async handleSubmit(toDraft) {
      this.form.isDraft = toDraft;
      if (this.form.id) {
        const res = await fetch.post("/api/article/modify", this.form);
        if (res.error_code === 0) {
          this.$Message.success("修改成功");
          this.$router.push("/user_info");
        }
      } else {
        const res = await fetch.post("/api/article/add", this.form);
        if (res.error_code === 0) {
          this.$Message.success("发布成功");
          this.$router.push("/user_info");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 calc((100vw - 1000px) / 2);
  height: 100%;
  padding-top: 20px;
}
.cover-wrap {
  background-color: #eee;
  background-size: cover;
  background-position: center;
  .upload-wrap {
    cursor: pointer;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #00000040;
    }
  }
  p {
    color: #333;
    letter-spacing: 3px;
  }
  input {
    display: none;
  }
}
.form {
  padding-top: 20px;
  .text-length-tip {
    text-align: right;
  }
}
.bottom {
  display: flex;
  padding: 20px 0;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
}
</style>
