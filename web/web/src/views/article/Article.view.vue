<template>
  <div class="container">
    <div class="article" v-if="detail">
      <div
        class="cover-container"
        v-if="detail.coverUrl"
        :style="{ backgroundImage: `url(${imgUrl(detail.coverUrl)})` }"
      ></div>
      <div class="article-wrap" :class="{ hasCover: detail.coverUrl }">
        <div class="title-wrap">
          <div class="left">
            <p class="title">{{ detail.title }}</p>
            <div class="subtitle-wrap">
              <span class="subtitle">{{
                moment(detail.updateAt).format("YYYY-MM-DD HH:mm")
              }}</span>
              <span class="subtitle"
                >作者：{{ _.get(detail, "author.name") }}</span
              >
            </div>
          </div>
          <div class="btn-wrap" v-if="canEdit">
            <Button type="primary" icon="md-brush" @click="handleEdit"
              >修改</Button
            >
            <Button type="error" icon="md-close" @click="handleDelete"
              >删除</Button
            >
          </div>
        </div>
        <div class="ql-snow content-container">
          <div class="ql-editor" v-html="detail.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "@utils/fetch";
import hljs from "highlight.js";
import moment from "moment";
import { Button } from "view-design";

export default {
  name: "Article",
  components: { Button },
  data() {
    return {
      detail: null,
      canEdit: false
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    moment: moment,
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    },
    async getArticle() {
      const { id } = this.$route.params;
      if (!id) {
        this.$$Message.error("文章不存在");
        return;
      }
      const res = await fetch.get("/api/article/get", { id });
      if (res.error_code === 0) {
        this.detail = res.data.article;
        this.canEdit = res.data.canEdit;
        this.$nextTick(() => this.initHighLight());
      }
    },
    initHighLight() {
      document.querySelectorAll(".ql-syntax").forEach(block => {
        hljs.highlightBlock(block);
      });
    },
    handleEdit() {
      this.$router.push({ name: "EditArticle", params: this.detail });
    },
    handleDelete() {
      this.$Modal.confirm({
        title: "确定要删除该文章吗",
        content: "被删除的文章无法恢复",
        onOk: async () => {
          const res = await fetch.post("/api/article/delete", {
            id: this.detail.id
          });
          if (res.error_code === 0) {
            this.$Message.success("删除成功");
            this.$router.replace("/user_info");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ql-editor {
  padding: 0;
}
.container {
  padding-top: 20px;
  height: 100%;
  overflow: scroll;
  .article {
    .cover-container {
      width: 1000px;
      height: 400px;
      padding: 20px 0;
      background-size: cover;
      background-position: center;
      position: fixed;
      top: 80px;
      left: calc((100vw - 1000px) / 2);
      z-index: 0;
    }
    .hasCover {
      padding-top: 440px;
    }
    .article-wrap {
      width: 1000px;
      margin: 0 auto;
      z-index: 1;
      position: relative;
      padding-bottom: 40px;
      .title-wrap {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 2.3em;
          color: #515a6e;
          font-weight: 700;
          font-family: "Helvetica Neue", Helvetica, "PingFang SC",
            "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }
      }
      .subtitle-wrap {
        background-color: #fff;
        .subtitle {
          color: #999;
          margin-right: 10px;
        }
      }
      .btn-wrap {
        button {
          margin-left: 10px;
        }
      }
      .content-container {
        background-color: #fff;
        padding-top: 40px;
      }
    }
  }
}
</style>
