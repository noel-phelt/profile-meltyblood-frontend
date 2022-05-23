<template>
  <div class="body">
    <div class="frame">
      <div class="container mx-auto px-2 content">
        <img
          class="title-logo"
          :src="`${$config.storageURL}/meltyblood_typelumina_logo02_neg.png`"
          alt="MELTY BLOOD: TYPE LUMINA"
        />
        <h1 class="title">メルブラTL自己紹介 カードメーカー</h1>
        <div class="text-center">
          <p class="description system-text">
            あなたの自己紹介カードを作ってSNSやコミュニティでアピールしよう！<br />
            自分に合ったプレイ環境や好みを画像で分かりやすく共有できる。<br />
            SNSに投稿したり対戦募集に使用すれば共に遊ぶ仲間が見つかる＆見つけられる！<br />
          </p>
        </div>
        <div class="">
          <h2 class="subtitle">自己紹介カードを生成する</h2>
          <div class="caption">
            <h3 class="single">プレイヤーネーム（20文字以内）</h3>
            <input
              class="textbox md:w-8/12 w-full"
              id="player_name"
              type="text"
              placeholder="名前を入力してください"
              v-model.lazy="playerName"
              autocomplete="off"
            />
          </div>
          <div class="caption">
            <h3 class="single">メインキャラクター</h3>
            <button
              class="select-button md:w-6/12 w-10/12"
              type="button"
              @click="openModal('modalCharacter')"
            >
              キャラクターを選択する
            </button>
            <modal
              ref="modalCharacter"
              modalType="modalCharacter"
              @result="profileImage = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">コミュニケーションツール（複数回答可）</h3>
            <button
              class="select-button md:w-6/12 w-10/12"
              type="button"
              @click="openModal('communicationTool')"
            >
              選択する
            </button>
            <modal
              ref="communicationTool"
              modalType="modalCheckBox"
              modalSet="communicationTool"
              @result="communicationToolList = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">プレイするハード（複数回答可）</h3>
            <button
              class="select-button md:w-6/12 w-10/12"
              type="button"
              @click="openModal('platform')"
            >
              選択する
            </button>
            <modal
              ref="platform"
              modalType="modalCheckBox"
              modalSet="platform"
              @result="platformList = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">プレイ時間</h3>
            <div class="multi-button md:flex">
              <div class="md:flex md:w-6/12 w-full">
                <h3 class="multi md:w-2/12 w-10/12 mb-3.5">平日</h3>
                <button
                  class="select-button md:w-9/12 w-10/12"
                  type="button"
                  @click="openModal('playTimeWeekend')"
                >
                  選択する
                </button>
              </div>
              <modal
                ref="playTimeWeekend"
                modalType="modalSelect"
                modalSet="playTime"
                @result="playTimeWeekend = $event"
              ></modal>
              <div class="md:flex md:w-6/12 w-full">
                <h3 class="multi md:w-2/12 w-10/12 md:mb-0 mb-3.5">休日</h3>
                <button
                  class="select-button md:w-9/12 w-10/12"
                  type="button"
                  @click="openModal('playTimeHoriday')"
                >
                  選択する
                </button>
                <modal
                  ref="playTimeHoriday"
                  modalType="modalSelect"
                  modalSet="playTime"
                  @result="playTimeHoriday = $event"
                ></modal>
              </div>
            </div>
          </div>
          <div class="caption">
            <h3 class="single">スタイル</h3>
            <div class="md:flex md:space-x-4 md:space-y-0space-y-3.5">
              <div class="md:w-3/12 w-10/12" v-for="index in 3" :key="index">
                <button
                  class="select-button md:w-full w-10/12"
                  type="button"
                  @click="openArrayModal('styles', index - 1)"
                >
                  選択する
                </button>
                <modal
                  ref="styles"
                  modalType="modalSelect"
                  modalSet="style"
                  @result="updateList(styleList, index - 1, $event)"
                ></modal>
              </div>
            </div>
          </div>
          <div class="caption">
            <h3 class="single">ランク帯</h3>
            <button
              class="select-button"
              type="button"
              @click="openModal('rank')"
            >
              選択する
            </button>
            <modal
              ref="rank"
              modalType="modalSelect"
              modalSet="rank"
              @result="rank = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">月姫歴</h3>
            <button
              class="select-button"
              type="button"
              @click="openModal('history')"
            >
              選択する
            </button>
            <modal
              ref="history"
              modalType="modalSelect"
              modalSet="history"
              @result="history = $event"
            ></modal>
          </div>
        </div>
        <canvasArea
          :canvasDataSet="canvasDataSet"
          @resultImage="resultImage = $event"
        ></canvasArea>
        <save :image="resultImage"></save>
        <policy></policy>
      </div>
      <customFooter></customFooter>
    </div>
  </div>
</template>
<script>
import modal from "@/components/modal.vue";
import canvasArea from "@/components/canvas.vue";
import customFooter from "@/components/footer.vue";
import save from "@/components/save.vue";
import policy from "@/components/policy.vue";

export default {
  data() {
    return {
      playerName: "",
      profileImage: "",
      playTimeWeekend: {},
      playTimeHoriday: {},
      platformList: [],
      communicationToolList: [],
      styleList: ["", "", ""],
      rank: "",
      history: "",
      resultImage: "",
    };
  },
  components: {
    modal,
    canvasArea,
    customFooter,
    save,
    policy,
  },
  methods: {
    updateList(array, index, value) {
      array.splice(index, 1, value);
    },
    openModal(modalType) {
      this.$refs[modalType].openModal();
    },
    openArrayModal(modalType, index) {
      this.$refs[modalType][index].openModal();
    },
  },
  computed: {
    canvasDataSet: function () {
      const canvasDataSet = {
        playerName: this.playerName,
        profileImage: this.profileImage,
        playTimeWeekend: this.playTimeWeekend,
        playTimeHoriday: this.playTimeHoriday,
        platformList: this.platformList,
        styleList: this.styleList,
        rank: this.rank,
        history: this.history,
        communicationToolList: this.communicationToolList,
      };
      return canvasDataSet;
    },
  },
};
</script>

<style scoped>
.body {
  background-image: url("@/assets/img/meltyblood_typelumina_background.png");
  /* background-image: "`${$config.storageURL}/meltyblood_typelumina_background.png`"; */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
.frame {
  background: rgba(0, 4, 59, 0.6);
}
h1 {
  background: -webkit-linear-gradient(top, aliceblue, #a6d5ef);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
  font: bold;
  font-size: 30px;
  text-align: center;
  margin: 10px 0 10px 0;
}
h3.single {
  color: white;
  text-shadow: 0 0 5px #a6d5ef;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;
  margin-bottom: 14px;
}
h3.multi {
  color: white;
  text-shadow: 0 0 5px #a6d5ef;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;
}
.textbox {
  border: 2px solid hsla(0, 0%, 100%, 0.15);
  padding: 15px 60px 15px 60px;
  background-color: rgba(0, 4, 59, 0.6);
  color: #cadceb;
  text-shadow: 0 0 3px aqua;
  font-family: "Noto Sans JP", sans-serif;
}
.textbox:focus {
  border: 2px solid rgba(211, 87, 104, 0.9);
  /* box-shadow: 0 0 5px 0 rgba(211, 87, 104, 0.6); */
  outline: none;
}
.content {
  height: 100%;
}
.select-button {
  font-family: "Noto Sans JP", serif;
  color: aliceblue;
  background-color: rgba(211, 87, 104, 0.6);
  /* transform: skew(-10deg); */
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  text-shadow: 0 0 20px red, 0 0 20px red;
  padding: 15px 60px 15px 60px;
  margin-bottom: 10px;
}
.select-button:hover,
a.select-button:hover {
  color: aliceblue;
  background-color: rgba(211, 87, 104, 0.9);
}
.subtitle {
  color: #cadceb;
  text-shadow: 0 0 5px aqua;
  font-size: 20px;
  font-family: "Noto Sans JP", sans-serif;
  background: linear-gradient(to right, #134f9a, rgba(0, 0, 0, 0));
  padding: 10px 0px 10px 5px;
}
.system-text {
  color: aliceblue;
  font-family: "Noto Serif JP", serif;
}
.description {
  margin-top: 20px;
  margin-bottom: 70px;
  font-size: 18px;
}
.caption {
  margin-top: 20px;
  margin-bottom: 60px;
}
.title-logo {
  margin: 0 auto 30px auto;
  width: 70%;
  height: 70%;
}
</style>
