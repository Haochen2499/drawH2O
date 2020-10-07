<template>
  <div class="container">
    <div class="base-info">
      <div class="card">
        <div class="left">
          <img :src="imgUrl(form.avatar)" class="avatar" v-if="form.avatar" />
          <img src="@assets/user/avatar.png" class="avatar" v-else />
          <label v-if="canEdit" class="upload-wrap" for="avatar">
            <div class="upload-text">上传头像</div>
          </label>
          <input
            @change="e => handleUpload(e)"
            type="file"
            id="avatar"
            accept=".jpe, .jpeg, .png"
          />
        </div>
        <div class="right">
          <div class="account-info">
            <div class="title">
              <template v-if="!isEditTitle">
                <p class="title-text">
                  {{ _.get(detail, "userName") }}
                  <Icon
                    type="md-brush"
                    @click="isEditTitle = true"
                    v-if="canEdit"
                  />
                </p>
              </template>
              <template v-else>
                <div class="input-wrap">
                  <Input
                    v-model="form.userName"
                    placeholder="请输入用户名"
                    maxlength="20"
                    show-word-limit
                    style="flex: 1"
                  />
                  <span class="cancel" @click="isEditTitle = false">取消</span>
                  <span class="confirm" @click="handleEditUserName">确认</span>
                </div>
              </template>
            </div>
            <p class="mail">{{ _.get(detail, "email") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="user-content">
      <Tabs v-model="tabValue">
        <TabPane label="文章" name="article">
          <ArticleList :data="articleList"></ArticleList>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Icon, Input, Tabs, TabPane } from "view-design";
import Upload from "@utils/upload";
import fetch from "@utils/fetch";
import { mapActions } from "vuex";
import ArticleList from "./articleList";

export default {
  name: "UserInfo",
  components: { Icon, Input, Tabs, TabPane, ArticleList },
  data() {
    return {
      isEditTitle: "",
      tabValue: "article",
      articleList: [],
      userId: null,
      canEdit: false,
      detail: null,
      form: {
        userName: "",
        avatar: ""
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  async created() {
    const { id } = this.$route.query;
    if (id) {
      // 如果有id，则读取id的信息
      this.userId = +id;
      await this.initOtherUserInfo();
    } else {
      if (this.userInfo) {
        this.detail = _.cloneDeep(this.userInfo);
        this.form.userName = this.userInfo.userName;
        this.form.avatar = this.userInfo.avatar;
        this.canEdit = true;
      }
    }
    this.getArticleList();
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo"
    }),
    async initOtherUserInfo() {
      const res = await fetch.get("/api/user/get", { id: this.userId });
      if (res.error_code === 0) {
        this.detail = _.cloneDeep(res.data);
        this.form.userName = res.data.userName;
        this.form.avatar = res.data.avatar;
      }
    },
    async handleUpload(e) {
      const file = e.target.files[0];
      const size = file.size / 1024; // 单位 kb
      const limit = 600;
      if (size > limit) {
        this.$Message.error(`文件大小不能大于${limit}KB`);
        return;
      }
      const res = await Upload(file);
      console.log(res);
      if (res) {
        this.form.avatar = res;
        this.updateAvatar();
      }
    },
    async updateAvatar() {
      let res = await fetch.post("/api/user/update", {
        avatar: this.form.avatar
      });
      if (res.error_code === 0) {
        this.getUserInfo();
      }
    },
    async handleEditUserName() {
      if (!this.form.userName) {
        this.$Message.error("用户名不能为空");
        return;
      }
      let res = await fetch.post("/api/user/update", {
        userName: this.form.userName
      });
      if (res.error_code === 0) {
        this.isEditTitle = false;
        this.getUserInfo();
        this.$Message.success("更改成功");
      }
    },
    imgUrl(url) {
      const host =
        process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
      return host + url;
    },
    async getArticleList() {
      this.$Loading.start();
      const res = await fetch.get("/api/user/articleList", { id: this.userId });
      this.$Loading.finish();
      if (res.error_code === 0) {
        this.articleList = res.data.list;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/reset.scss";
.container {
  background-color: $bg-color;
  height: 100%;
  overflow: scroll;
  padding: 0 20vw;
  .base-info {
    margin-top: 20px;
    .card {
      width: 100%;
      display: flex;
      padding: 15px;
      border-radius: 8px;
      background-color: #fff;
      .left {
        width: 250px;
        height: 250px;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        .avatar {
          width: 100%;
          height: 100%;
        }
        .upload-wrap {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all ease 0.3s;
          width: 100%;
          height: 100%;
          background-color: transparent;
          cursor: pointer;
          .upload-text {
            display: none;
            font-size: 16px;
            letter-spacing: 2px;
            font-weight: 500;
            color: #fff;
          }
          &:hover {
            background-color: #00000040;
            .upload-text {
              display: inline;
            }
          }
        }
        input[type="file"] {
          display: none;
        }
      }
      .right {
        padding: 15px;
        display: flex;
        flex: 1;
        .account-info {
          width: 100%;
        }
        .title {
          width: 100%;
          p {
            color: #333;
            font-size: 26px;
            i {
              font-size: 12px;
              vertical-align: middle;
              cursor: pointer;
            }
          }
          .input-wrap {
            display: flex;
            align-items: center;
            .confirm,
            .cancel {
              font-size: 12px;
              margin-left: 5px;
              color: #999;
              cursor: pointer;
              color: $main-color;
            }
          }
        }
        .mail {
          color: #999;
        }
      }
    }
  }
  .user-content {
    background-color: #fff;
    margin-top: 10px;
    padding: 0 20px;
    border-radius: 8px;
    /deep/ .ivu-tabs-bar {
      margin-bottom: 0;
    }
  }
}
</style>
