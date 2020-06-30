<template>
  <layout>
    <div class="header">
      <p class="site-name">hhc test</p>
      <div class="right">
        <Menu mode="horizontal" theme="light">
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
          <template v-if="false">
            <img src="@assets/logo.png" />
            <span>1098982341</span>
          </template>
          <template v-else>
            <span class="register" @click="showRegisterModal = true"
              >注册/登录
            </span>
          </template>
        </div>
      </div>
    </div>
    <h-modal v-model="showRegisterModal">
      <div class="register-wrap">
        <div class="header">
          <span class="title">注册</span>
        </div>
      </div>
    </h-modal>
  </layout>
</template>

<script>
import { Layout, Menu, MenuItem } from "view-design";
import hModal from "@/components/Modal.vue";
export default {
  name: "Header",
  components: {
    Layout,
    Menu,
    MenuItem,
    hModal
  },
  data() {
    return {
      showRegisterModal: false,
      isLogin: true // 是否为登录
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/reset.scss";
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
        font-size: 14px;
      }
      span:hover {
        color: $main-color;
        cursor: pointer;
      }
      .register {
        color: $main-color;
        cursor: pointer;
      }
    }
  }
}
</style>
