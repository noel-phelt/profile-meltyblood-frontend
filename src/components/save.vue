<template>
  <div>
    <div class="content md:flex md:space-x-4 space-y-4 md:space-y-0">
      <button
        type="submit"
        class="twitter md:w-5/12 w-10/12"
        @click="tweetProfile()"
      >
        <div class="twitter-content">
          <img class="logo" :src="`${$staticURL}icon/Twitter_white.png`" />
          <span>画像をツイートする</span>
        </div>
      </button>
      <button type="submit" class="twitter md:w-5/12 w-10/12">
        <div class="twitter-content">
          <img class="logo" :src="`${$staticURL}icon/Twitter_white.png`" />
          <span>参加者募集</span>
        </div>
      </button>
    </div>
    <div class="content md:flex">
      <button class="download" @click="openImageLink()">
        画像をダウンロードする
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const serviceTag = "メルブラTLプロフィール";
const gameTag = "MELTY BLOOD: TYPE LUMINA";
export default {
  props: {
    image: {
      type: String,
      default: "",
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
      const win = window.open();
      win.document.write(winHtml);
    },
    tweetProfile() {
      const url = `https://twitter.com/intent/tweet?text=%23${serviceTag}`;
      window.open(url);
    },
  },
};
</script>
<style scoped>
.content {
  justify-content: center;
  text-align: center;
  margin: 40px 0 40px 0;
}
.twitter {
  font-family: "Noto Sans JP", serif;
  color: aliceblue;
  background: rgba(29, 161, 242, 0.6);
  padding: 20px 10px 20px 10px;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
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
  /* background: rgba(29, 161, 242, 0.6); */
  background: rgb(253, 216, 53, 0.6);
  padding: 15px 60px 15px 60px;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
}
.download:hover {
  background: rgb(253, 216, 53, 0.9);
}
.twitter:hover {
  background: rgba(29, 161, 242, 0.9);
}
</style>
