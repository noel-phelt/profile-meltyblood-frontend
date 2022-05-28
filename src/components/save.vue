<template>
  <div class="content">
    <button class="download md:w-6/12 w-full" @click="openImageLink()">
      画像をダウンロードする
    </button>
    <button class="twitter md:w-6/12 w-full" @click="tweetProfile()">
      <div class="twitter-content">
        <img class="logo" :src="`${$staticURL}icon/Twitter_white.png`" />
        <span>ハッシュタグつきでツイートする</span>
      </div>
    </button>
    <div>
      <span class="system-text">
        プロフィールが完成したら、
        <br class="md:hidden" />
        保存して ハッシュタグ<br /><span class="topic"
          >#メルブラTLプロフィール</span
        >
        <br class="md:hidden" />
        をつけて共有しましょう 。
        <br />あなたに興味を持ったプレイヤーと
        <br class="md:hidden" />
        交流するきっかけになるかもしれません。
      </span>
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
      const win = window.open("about:blank");
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
</style>
