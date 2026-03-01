<template></template>

<script>
import { setAccessToken } from "@/libs/auth";
import {
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";

export default {
  async mounted() {
    const result = await getRedirectResult(this.$fire.auth);
    // auth/redirect-cancelled-by-user の対応が必要
    if (result === null) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(this.$fire.auth, provider);
    } else {
      setAccessToken(await result.user.getIdToken());
      // セッション維持のために一度バックエンドを叩く（必要であれば）
      await this.$axios.get("/login").catch(() => {});
      window.location.href = "/";
    }
  },
};
</script>
