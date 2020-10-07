<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import { mapActions } from "vuex";
import Cookie from "js-cookie";

export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {};
  },
  created() {
    if (this.isLogin) {
      this.getUserInfo();
    }
  },
  computed: {
    isLogin() {
      return !!Cookie.get("isLogin");
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/reset.scss";
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .site-name {
    font-weight: bold;
    font-size: 24px;
    margin-left: 20px;
  }
  .right {
    display: flex;
    align-items: center;
    .ivu-menu-item {
      background-color: #f5f7f9;
    }
    .user-info {
      display: flex;
      align-items: center;
      margin: 0 10px;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 14;
      }
      span:hover {
        color: $main-color;
        cursor: pointer;
      }
    }
  }
}
.container {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: scroll;
}
</style>
