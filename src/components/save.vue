<template>
  <div class="content">
    <button class="download md:w-6/12 w-full" @click="openImageLink()">
      画像をダウンロードする
    </button>
    <button
      class="twitter md:w-6/12 w-full"
      :disabled="isSubmitting || !image"
      @click="tweetProfile()"
    >
      <div class="twitter-content">
        <img class="logo" :src="`${$staticURL}icon/Twitter_white.png`" />
        <span>{{ twitterButtonLabel }}</span>
      </div>
    </button>
    <div>
      <span class="system-text">
        プロフィールが完成したら、
        <br class="md:hidden" />
        保存して ハッシュタグ<br /><span class="topic"
          >#メルブラTLプロフィール</span
        >と
        <br class="md:hidden" />
        共有URLつきでポストしましょう 。
        <br />
        （OGP画像として表示されるまで少し時間がかかる場合があります）
        <br />あなたに興味を持ったプレイヤーと
        <br class="md:hidden" />
        交流するきっかけになるかもしれません。
      </span>
    </div>
    <p class="share-note">
      共有URLのOGP画像は30日後に見られなくなります。
      <br />
      長く見られる形で投稿したい場合は、上の「画像をダウンロードする」から保存した画像を使って投稿してください。
    </p>
    <p v-if="shareError" class="error-text">{{ shareError }}</p>
  </div>
</template>
<script>
const serviceTag = "メルブラTLプロフィール";

export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    shareData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSubmitting: false,
      shareError: "",
      shareUrl: "",
    };
  },
  computed: {
    twitterButtonLabel() {
      if (this.isSubmitting) {
        return "共有URLを発行中...";
      }
      return "ハッシュタグつきでツイートする";
    },
  },
  methods: {
    openImageLink() {
      const winHtml = `
      <html>
          <head>
          </head>
          <body style="display:flex; align-items: center; justify-content: center; margin: 0px; background: #0e0e0e; width: 100%; height: 100%">
              <img src="${this.image}" style="width: 100%; max-width: 1200px;" alt="">
          </body>
      </html>`;
      const win = window.open("about:blank");
      win.document.write(winHtml);
    },
    async tweetProfile() {
      this.shareError = "";
      if (!this.image) {
        this.shareError = "先にカード画像を生成してください。";
        return;
      }

      try {
        this.isSubmitting = true;
        const shareUrl = this.shareUrl || (await this.createShare());
        const tweetText = `#${serviceTag}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
      } catch (error) {
        const detail =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.detail
            ? error.response.data.detail
            : "共有URLの発行に失敗しました。時間をおいて再度お試しください。";
        this.shareError = detail;
      } finally {
        this.isSubmitting = false;
      }
    },
    async createShare() {
      const formData = new FormData();
      const imageBlob = await this.dataUrlToBlob(this.image);
      formData.append("image", imageBlob, "profile-card.png");

      Object.entries(this.shareData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          return;
        }
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
          return;
        }
        formData.append(key, value);
      });

      const response = await this.$axios.$post("/shares", formData);
      this.shareUrl = response.share_url || `${this.$config.siteURL}/share/${response.share_id}`;
      return this.shareUrl;
    },
    async dataUrlToBlob(dataUrl) {
      const response = await fetch(dataUrl);
      return await response.blob();
    },
  },
  watch: {
    image() {
      this.shareUrl = "";
      this.shareError = "";
    },
    shareData: {
      handler() {
        this.shareUrl = "";
        this.shareError = "";
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.content {
  text-align: center;
  margin: 100px auto 0 auto;
}
.content button {
  display: block;
  height: 80px;
  margin: 40px auto 40px auto;
}
.system-text {
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
  text-align: center;
  font-size: 18px;
}
.system-text {
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
  text-align: center;
  font-size: 18px;
}
.system-text .topic {
  color: #feea10;
}
.twitter {
  font-family: "Noto Sans JP", serif;
  color: aliceblue;
  background: rgba(29, 161, 242, 0.6);
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
}
.twitter:disabled {
  cursor: progress;
  opacity: 0.8;
}
.twitter-content {
  display: flex;
  margin: 0 5% 0 5%;
  justify-content: center;
}
.twitter .logo {
  width: 35px;
  height: 29px;
  margin-right: 10px;
}
.download {
  font-family: "Noto Sans JP", serif;
  color: aliceblue;
  background: rgb(253, 216, 53, 0.6);
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
}
.download:hover {
  background: rgb(253, 216, 53, 0.9);
}
.twitter:hover {
  background: rgba(29, 161, 242, 0.9);
}
.twitter:disabled:hover {
  background: rgba(29, 161, 242, 0.6);
}
.error-text {
  color: #ffb4b4;
  font-family: "Noto Sans JP", serif;
  font-size: 16px;
  margin-top: 20px;
}
.share-note {
  color: #d7e8ff;
  font-family: "Noto Sans JP", serif;
  font-size: 15px;
  line-height: 1.8;
  margin: 24px auto 0;
  max-width: 760px;
}
</style>
