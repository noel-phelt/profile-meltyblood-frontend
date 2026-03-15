<template>
  <div class="share-page">
    <background></background>
    <div class="frame">
      <div class="container mx-auto px-2 md:w-[1000px]">
        <h1 class="title">{{ pageTitle }}</h1>
        <p class="description system-text">
          共有された自己紹介カードです。画像を見て、気になったらぜひ交流してみてください。
        </p>
        <div class="card-frame">
          <img
            v-if="share.image_url"
            class="share-image"
            :src="share.image_url"
            :alt="pageTitle"
          />
          <p v-else class="system-text">画像を読み込めませんでした。</p>
        </div>
        <NuxtLink class="back-link" to="/">自分のカードを作る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import background from "@/components/background.vue";

const defaultTitle = "メルブラTL自己紹介カードメーカー";
const defaultDescription =
  "メルブラTLであなただけの自己紹介カードを作成してSNSでアピールできます。";

export default {
  components: {
    background,
  },
  async asyncData({ $axios, params, error }) {
    try {
      const share = await $axios.$get(`/shares/${params.id}`);
      return { share };
    } catch (err) {
      error({ statusCode: 404, message: "Share not found" });
      return { share: {} };
    }
  },
  data() {
    return {
      share: {},
    };
  },
  computed: {
    pageTitle() {
      return this.share.player_name
        ? `${this.share.player_name}のメルブラTL自己紹介カード`
        : defaultTitle;
    },
    pageDescription() {
      if (this.share.player_name) {
        return `${this.share.player_name}さんのメルブラTL自己紹介カードです。`;
      }
      return defaultDescription;
    },
    pageUrl() {
      if (this.share.share_url) {
        return this.share.share_url;
      }
      return `${this.$config.siteURL}/share/${this.$route.params.id}`;
    },
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageDescription,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: defaultTitle,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: this.pageUrl },
        { hid: "og:title", property: "og:title", content: this.pageTitle },
        {
          hid: "og:description",
          property: "og:description",
          content: this.pageDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.share.image_url,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.pageTitle,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.pageDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.share.image_url,
        },
      ],
    };
  },
};
</script>

<style scoped>
.share-page {
  min-height: 100vh;
}
.frame {
  position: relative;
  z-index: 100;
  padding: 48px 0 80px;
}
.title {
  background: -webkit-linear-gradient(top, aliceblue, #a6d5ef);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
  font-size: 30px;
  margin: 0 0 16px;
  text-align: center;
}
.description {
  font-size: 18px;
  margin: 0 auto 40px;
  max-width: 720px;
  text-align: center;
}
.system-text {
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
}
.card-frame {
  margin: 0 auto 32px;
  max-width: 1200px;
}
.share-image {
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  display: block;
  width: 100%;
}
.back-link {
  color: #feea10;
  display: block;
  font-family: "Noto Sans JP", sans-serif;
  text-align: center;
  text-shadow: 0 0 8px rgba(55, 183, 255, 0.7);
}
</style>
