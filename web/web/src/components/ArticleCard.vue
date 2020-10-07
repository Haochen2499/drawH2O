<template>
  <div class="article-card">
    <div class="content">
      <div class="title-wrap" @click="$router.push(`/article/${data.id}`)">
        <p class="title">{{ data.title }}</p>
        <div v-if="data.isDraft" class="draft">草稿</div>
      </div>
      <div class="desc" v-if="data.desc">{{ data.desc }}</div>
      <div class="bottom-info">
        <Icon type="ios-clock" class="icon"></Icon>
        <span>{{ moment(data.updatedAt).format("YYYY-MM-DD") }}</span>
        <Icon type="ios-eye" class="icon"></Icon>
        <span>{{ data.view }}</span>
      </div>
    </div>
    <div
      v-if="data.coverUrl"
      class="cover"
      :style="{ backgroundImage: `url(${imgUrl(data.coverUrl)})` }"
    ></div>
  </div>
</template>

<script>
import moment from "moment";
import { Icon } from "view-design";
export default {
  name: "ArticleCard",
  components: { Icon },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    moment,
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/reset.scss";
.article-card {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  margin: 0 15px;
  border-bottom: 1px solid #f4f4f4;
  .content {
    flex: 1;
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        cursor: pointer;
      }
      .draft {
        font-size: 12px;
        color: #999;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 2px;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    }
    .desc {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .bottom-info {
      margin-top: 10px;
      .icon {
        font-size: 14px;
        color: #999;
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        color: #999;
        margin-right: 10px;
      }
    }
  }
  .cover {
    background-position: center;
    background-size: cover;
    width: 100px;
    border-radius: 8px;
  }
}
</style>
