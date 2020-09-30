<template>
  <div class="list">
    <ArticleCard
      class="article-item"
      v-for="item in data"
      :key="item.id"
      :data="item"
    ></ArticleCard>
    <div v-if="!data.length" class="no-info">什么都没有哦</div>
  </div>
</template>

<script>
import moment from "moment";
import ArticleCard from "@components/ArticleCard";
export default {
  components: { ArticleCard },
  name: "articleList",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    moment
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/reset.scss";
.list {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  .article-item {
    display: flex;
    justify-content: space-between;
  }
  .title {
    cursor: pointer;
  }
  .no-info {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
