<template>
  <div id="app">
    <layout v-model="isShow">
      <Header class="header">
        <p class="site-name">hhc test</p>
        <div class="right">
          <Menu
            mode="horizontal"
            theme="light"
            :active-name="activeMenu"
            @on-select="handleSelectMenu"
          >
            <MenuItem :name="1" to="/index">
              <span>首页</span>
            </MenuItem>
            <MenuItem :name="2" to="/about">
              <span>关于</span>
            </MenuItem>
            <MenuItem :name="3" to="/my">
              <span>我的</span>
            </MenuItem>
          </Menu>
          <div class="user-info">
            <img src="@assets/logo.png" />
            <span>1098982341</span>
          </div>
        </div>
      </Header>
    </layout>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import fetch from "./utils/fetch";
import { Layout, Menu, MenuItem } from "view-design";

export default {
  name: "app",
  components: {
    Layout,
    Menu,
    MenuItem,
  },
  data() {
    return {
      isShow: true,
      activeMenu: 1,
    };
  },
  async created() {},
  methods: {
    handleSelectMenu(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/reset.scss";
#app {
  height: 100vh;
  width: 100vw;
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
</style>
