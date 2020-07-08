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
          <template v-if="userInfo">
            <img :src="imgUrl(userInfo.avatar)" v-if="userInfo.avatar" />
            <img src="@assets/user/avatar.png" v-else />
            <Dropdown placement="bottom-end">
              <span>{{ userInfo.userName }}</span>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="$router.push('/user_info')"
                  >我的</DropdownItem
                >
                <DropdownItem @click.native="handleLogout">注销</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
          <template v-else>
            <span class="register" @click="showRegisterModal = true"
              >注册/登录</span
            >
          </template>
        </div>
      </div>
    </div>
    <h-modal v-model="showRegisterModal">
      <div class="register-wrap">
        <div class="header">
          <span class="title">{{ titleText }}</span>
          <Icon @click="showRegisterModal = false" type="md-close" size="18" />
        </div>
        <div v-if="currentType === 'login'" class="input-wrap">
          <div class="title">邮箱</div>
          <Input
            prefix="ios-mail-outline"
            placeholder="请输入邮箱"
            v-model="form.email"
          />
          <div class="title">密码</div>
          <Input
            prefix="ios-lock-outline"
            placeholder="请输入密码"
            v-model="form.password"
            type="password"
            password
          />
          <p class="warn-text" v-if="warnText">{{ warnText }}</p>
          <Button class="btn" long type="primary" @click="handleLogin"
            >登录</Button
          >
          <div class="forget-wrap">
            <p @click="currentType = 'register'">去注册</p>
            <p @click="currentType = 'reset'">忘记密码</p>
          </div>
        </div>
        <div v-if="currentType === 'reset'" class="input-wrap">
          <div class="title">邮箱</div>
          <Input
            prefix="ios-mail-outline"
            placeholder="请输入邮箱"
            v-model="form.email"
          />
          <div class="title">验证码</div>
          <div class="reset-wrap">
            <Input
              prefix="ios-keypad-outline"
              placeholder="请输入验证码"
              style="flex: 1"
              maxlength="4"
              v-model="form.resetKey"
            />
            <Button
              style="margin-left: 15px"
              :disabled="isGetResetKeyDisabled"
              @click="getResetKey"
              >{{ getResetKeyText }}</Button
            >
          </div>
          <div class="title">新密码</div>
          <Input
            prefix="ios-lock-outline"
            placeholder="请输入新密码"
            v-model="form.password"
            type="password"
            password
          />
          <p class="warn-text" v-if="warnText">{{ warnText }}</p>
          <Button class="btn" long type="primary" @click="handleReset"
            >重置密码</Button
          >
          <div class="has-account">
            <p @click="currentType = 'login'">已有账号，去登陆</p>
          </div>
        </div>
        <div v-if="currentType === 'register'" class="input-wrap">
          <div class="title">邮箱</div>
          <Input
            prefix="ios-mail-outline"
            placeholder="用于登录和找回密码"
            v-model="form.email"
          />
          <div class="title">用户名</div>
          <Input
            prefix="ios-person-outline"
            placeholder="用户名/8位以下"
            v-model="form.userName"
          />
          <div class="title">密码</div>
          <Input
            prefix="ios-lock-outline"
            placeholder="密码/8~20位"
            v-model="form.password"
            type="password"
            password
          />
          <p class="warn-text" v-if="warnText">{{ warnText }}</p>
          <Button class="btn" long type="primary" @click="handleRegister"
            >注册</Button
          >
          <div class="has-account">
            <p @click="currentType = 'login'">已有账号，去登陆</p>
          </div>
        </div>
      </div>
    </h-modal>
  </layout>
</template>

<script>
import {
  Layout,
  Menu,
  MenuItem,
  Icon,
  Input,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "view-design";
import hModal from "@/components/Modal.vue";
import fetch from "@utils/fetch";
import { mapActions, mapState } from "vuex";
export default {
  name: "Header",
  components: {
    Layout,
    Menu,
    MenuItem,
    hModal,
    Icon,
    Input,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  data() {
    return {
      showRegisterModal: false,
      currentType: "register", // ['register', 'reset', 'login']
      form: {
        email: "",
        userName: "",
        password: "",
        resetKey: ""
      },
      warnText: "",
      getResetKeyPending: false,
      getResetKeyText: "获取验证码"
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    isGetResetKeyDisabled() {
      return (
        this.getResetKeyPending ||
        !this.form.email ||
        this.getResetKeyText === "已发送"
      );
    },
    titleText() {
      return {
        register: "注册",
        login: "登录",
        reset: "找回密码"
      }[this.currentType];
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
      logout: "logout"
    }),
    async handleRegister() {
      this.warnText = "";
      let res = await fetch.post("/api/user/register", this.form);
      if (res.error_code === 0) {
        this.showRegisterModal = null;
        this.getUserInfo();
      } else {
        this.warnText = res.error_msg;
      }
    },
    async handleLogin() {
      this.warnText = "";
      let res = await fetch.post("/api/user/login", this.form);
      if (res.error_code === 0) {
        this.showRegisterModal = null;
        this.getUserInfo();
      } else {
        this.warnText = res.error_msg;
      }
    },
    async getResetKey() {
      this.warnText = "";
      this.getResetKeyPending = true;
      const res = await fetch.post("/api/user/get_reset_key", {
        email: this.form.email
      });
      this.getResetKeyPending = false;
      if (res.error_code === 0) {
        this.getResetKeyText = "已发送";
      } else {
        this.warnText = res.error_msg;
      }
    },
    async handleReset() {
      const res = await fetch.post("/api/user/reset_password", this.form);
      if (res.error_code === 0) {
        this.currentType = "login";
        this.$Message.success("重置成功");
      } else {
        this.warnText = res.error_msg;
      }
    },
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    },
    async handleLogout() {
      const res = await this.logout();
      if (res.error_code === 0) {
        this.$Message.success("注销成功");
        this.$router.replace("/index");
      }
    }
  },
  watch: {
    currentType() {
      this.warnText = "";
    }
  }
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
.register-wrap {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  width: 350px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 18px;
    }
    i {
      cursor: pointer;
    }
  }
  .input-wrap {
    padding-top: 10px;
    .title {
      margin: 5px 0;
    }
    .btn {
      margin-top: 30px;
    }
    .warn-text {
      color: $warn-color;
      margin-top: 5px;
    }
    .has-account {
      margin-top: 10px;
      p {
        color: $main-color;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
      }
    }
    .forget-wrap {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      p {
        color: $main-color;
        cursor: pointer;
        font-weight: bold;
      }
    }
    .reset-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
