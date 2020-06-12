<template>
  <div class="container">
    <div class="wrap">
      <div class="type-select-wrap">
        <div
          class="type-item"
          :class="{ active: currentType === item.type }"
          v-for="item in INFO_TYPE"
          :key="item.type"
          @click="handleSelectType(item.type)"
        >
          <p>{{ item.name }}</p>
        </div>
      </div>
      <Scroll class="scroller" height="700" :on-reach-bottom="getMoreList">
        <div class="list-wrap">
          <div
            class="list-item"
            :class="{ 'img-list': item.cover_url }"
            v-for="item in list"
            :key="item.url"
          >
            <div class="left">
              <img v-if="item.cover_url" :src="imgUrl(item.cover_url)" />
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </div>
            <div class="right">
              <span>{{ timeParser(item.createdAt) }}</span>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import { INFO_TYPE } from "@/config";
import fetch from "@utils/fetch";
import { Scroll } from "view-design";
import timeParser from "@utils/timeParser";
export default {
  name: "Index",
  components: { Scroll },
  data() {
    return {
      INFO_TYPE,
      currentType: INFO_TYPE[0].type,
      list: [],
      page: 1,
      count: 0,
      loading: false
    };
  },
  created() {
    console.log(process.env.NODE_ENV);
    this.getList();
  },
  methods: {
    handleSelectType(type) {
      this.currentType = type;
      this.getList();
    },
    async getList(isLoadingMore) {
      if (this.loading) {
        return;
      }
      if (isLoadingMore) {
        this.page++;
      } else {
        this.page = 1;
      }
      this.loading = true;
      let res = await fetch.get("/api/info/get_list", {
        type: this.currentType,
        page: this.page,
        pageSize: 50
      });
      this.loading = false;
      if (res.error_code === 0) {
        const newData = res.data.list;
        if (isLoadingMore) {
          this.list = [...this.list, ...newData];
          console.log(this.list);
        } else {
          this.list = newData;
          this.count = res.data.count;
        }
      }
    },
    getMoreList() {
      return new Promise(resolve => {
        if (this.list.length === this.count) {
          console.log("no more");
          resolve();
          return;
        }
        this.getList(true).then(() => {
          resolve();
        });
      });
    },
    timeParser,
    toCDN(url) {
      return `this.src = 'https://images.weserv.nl/?url=${url}'`;
    },
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/reset.scss";
.container {
  background-color: #f1f1f1;
  width: 100%;
  height: calc(100% - 60px);
  padding: 15px 0;
  .wrap {
    margin: 0 auto;
    width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .type-select-wrap {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      background-color: #fff;
      z-index: 1;
      .type-item {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
        padding: 3px 5px;
        border-radius: 3px;
        border: 1px solid #ddd;
        margin-right: 10px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $main-color;
          border-color: $main-color;
        }
      }
    }
    .scroller {
      width: 100%;
      flex: 1;
      .list-item {
        background-color: #fff;
        border-radius: 6px;
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        a {
          color: #333;
        }
        .left {
          display: flex;
        }
        .right {
          display: flex;
          flex-shrink: 0;
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .img-list {
        img {
          width: 90px;
          height: 60px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
