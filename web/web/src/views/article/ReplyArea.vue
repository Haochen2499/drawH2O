<template>
  <div class="reply-area">
    <ReplyInput @onSubmit="handleSubmit" ref="mainInput"></ReplyInput>
    <div class="reply-item" v-for="item in data" :key="item.key">
      <div class="avatar-wrap">
        <img
          :src="hostUrl(item.creator.avatar)"
          class="avatar"
          v-if="item.creator.avatar"
        />
        <img src="@assets/user/avatar.png" class="avatar" v-else />
      </div>
      <div class="comment-area">
        <div class="main-reply">
          <span class="user" @click="toUserDetail(item.creator.id)">
            {{ item.creator.userName }}
          </span>
          <p class="content">{{ item.content }}</p>
          <ReplyInput
            v-if="item.id === currentReplyId"
            @onSubmit="handleReply"
            class="comment-reply-input"
          ></ReplyInput>
          <div class="bottom">
            <p class="time">{{ timeParser(item.createdAt, true) }}</p>
            <div class="right">
              <div class="btn-item">
                <Icon type="ios-thumbs-up-outline" />
                <p>{{ item.likes }}</p>
              </div>
              <div class="btn-item" @click="showReplyInput(item, item.id)">
                <Icon type="ios-chatboxes-outline" />
                <p class="comment">回复</p>
              </div>
              <div
                class="btn-item"
                v-if="isSelfArticle"
                @click="handleDeleteComment(item.id)"
              >
                <p class="delete">删除</p>
              </div>
            </div>
          </div>
        </div>
        <div class="child-comment-wrap" v-if="item.childComments.length">
          <div
            class="child-comment"
            v-for="child in item.childComments"
            :key="child.id"
          >
            <div class="avatar-wrap">
              <img
                :src="hostUrl(child.creator.avatar)"
                class="avatar"
                v-if="child.creator.avatar"
              />
              <img src="@assets/user/avatar.png" class="avatar" v-else />
            </div>
            <div class="child-content">
              <div class="title-wrap">
                <span class="user" @click="toUserDetail(child.creator.id)">{{
                  child.creator.userName
                }}</span>
                <span>回复给</span>
                <span class="user" @click="toUserDetail(child.replyTo.id)"
                  >{{ child.replyTo.userName }}：</span
                >
              </div>
              <p class="content">{{ child.content }}</p>
              <ReplyInput
                v-if="child.id === currentReplyId"
                @onSubmit="handleReply"
                :isChild="true"
                class="comment-reply-input"
              ></ReplyInput>
              <div class="bottom">
                <p class="time">{{ timeParser(child.createdAt, true) }}</p>
                <div class="right">
                  <div class="btn-item">
                    <Icon type="ios-thumbs-up-outline" />
                    <p>{{ child.likes }}</p>
                  </div>
                  <div class="btn-item" @click="showReplyInput(child, item.id)">
                    <Icon type="ios-chatboxes-outline" />
                    <p class="comment">回复</p>
                  </div>
                  <div
                    class="btn-item"
                    v-if="isSelfArticle"
                    @click="handleDeleteComment(child.id)"
                  >
                    <p class="delete">删除</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeParser from "@utils/timeParser";
import { Icon } from "view-design";
import ReplyInput from "./ReplyInput";

export default {
  name: "ReplyArea",
  components: { Icon, ReplyInput },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    articleId: {
      type: Number
    },
    isSelfArticle: {
      type: Boolean
    }
  },
  data() {
    return {
      currentReplyComment: null,
      currentParentId: null,
      showEmoji: false
    };
  },
  created() {},
  computed: {
    currentReplyId() {
      return this.currentReplyComment ? this.currentReplyComment.id : null;
    }
  },
  methods: {
    timeParser,
    toUserDetail(id) {
      this.$router.push(`/user_info?id=${id}`);
    },
    handleEmoji(emoji) {
      if (this.currentReplyId) {
        this.currentCommentReply += emoji.native;
      } else {
        this.currentInput += emoji.native;
      }
    },
    async handleSubmit(val) {
      const res = await this.$fetch.post("/api/article/createComment", {
        content: val,
        articleId: this.articleId
      });
      if (res.error_code === 0) {
        this.$refs.mainInput.currentInput = "";
        this.currentReplyComment = null;
        this.$Message.success("评论成功");
        this.$emit("onRefresh");
      }
    },
    async handleReply(val) {
      const res = await this.$fetch.post("/api/article/createComment", {
        content: val,
        articleId: this.articleId,
        parentId: this.currentParentId,
        replyUid: this.currentReplyComment.creator.id
      });
      if (res.error_code === 0) {
        this.currentReplyComment = null;
        this.$Message.success("回复成功");
        this.$emit("onRefresh");
      }
    },
    showReplyInput(item, parentId) {
      if (this.currentReplyId === item.id) {
        this.currentReplyComment = null;
        this.currentParentId = null;
        return;
      }
      this.currentReplyComment = item;
      this.currentParentId = parentId || null;
    },
    handleDeleteComment(id) {
      this.$Modal.confirm({
        title: "确定要删除该评论吗",
        content: "被删除的评论无法恢复",
        onOk: async () => {
          const res = await this.$fetch.post("/api/article/deleteComment", {
            id
          });
          if (res.error_code === 0) {
            this.$Message.success("删除成功");
            this.$emit("onRefresh");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/reset.scss";
.reply-area {
  background-color: #fff;
  padding: 0 15px;
  .reply-item {
    display: flex;
    justify-content: space-between;

    padding: 10px 0;
    &:not(:last-child) {
      border-bottom: 1px solid $border-color;
    }
    .avatar-wrap {
      padding-right: 10px;
      flex-shrink: 0;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .comment-area {
      flex: 1;
      .time {
        color: #999;
        font-size: 12px;
        margin-top: 5px;
      }
      .content {
        font-size: 16px;
      }
      .title-wrap {
        display: flex;
        span {
          margin-right: 7px;
        }
      }
      .user {
        color: $main-color;
        cursor: pointer;
      }
      .child-comment-wrap {
        background-color: #fafbfc;
        padding: 0 15px;
        margin-top: 10px;
        .child-comment {
          display: flex;
          padding: 15px 0px;
          &:not(:last-child) {
            border-bottom: 1px solid $border-color;
          }
          .child-content {
            flex: 1;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
          display: flex;
          .btn-item {
            display: flex;
            align-items: center;
            margin-left: 20px;
            cursor: pointer;
            p {
              font-size: 12px;
              color: #666;
            }
            .delete {
              color: $warn-color;
            }
          }
        }
      }
    }
  }
}
.comment-reply-input {
  margin: 10px 0;
}
</style>
