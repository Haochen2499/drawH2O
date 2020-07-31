<template>
  <div class="article-card">
    <div class="content">
      <div class="title" @click="$router.push(`/article/${data.id}`)">
        {{ data.title }}
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
  padding-bottom: 15px;
  margin: 0 15px;
  border-bottom: 1px solid #f4f4f4;
  .content {
    flex: 1;
    .title {
      font-size: 18px;
      cursor: pointer;
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
