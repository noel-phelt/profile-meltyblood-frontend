<template>
  <div>
    <background></background>
    <div class="frame">
      <div class="container mx-auto px-2 md:w-[1000px]">
        <img
          class="title-logo"
          :src="`${$config.storageURL}/meltyblood_typelumina_logo02_neg.png`"
          alt="MELTY BLOOD: TYPE LUMINA"
        />
        <h1 class="title">
          メルブラTL<br class="md:hidden" />自己紹介カードメーカー
        </h1>
        <div class="text-center">
          <p class="description system-text">
            メルブラTLであなただけの自己紹介カードを作成して
            <br class="md:hidden" />
            SNSでアピールできます。
            <br />
            同じプラットフォームやプレイスタイルの近い相手を見つけて交流しましょう。
          </p>
        </div>
        <div class="">
          <h2 class="subtitle">自己紹介カードを生成する</h2>
          <div class="caption">
            <h3 class="single">
              プレイヤーネーム

              <br class="md:hidden" />
              （20文字以内）
            </h3>
            <input
              class="textbox md:w-8/12 w-full"
              id="player_name"
              type="text"
              placeholder="名前を入力してください"
              v-model.lazy="playerName"
              maxlength="20"
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
              <span v-if="character.name">
                {{ character.name }}
              </span>
              <span v-else> キャラクターを選択する </span>
            </button>
            <modal
              ref="modalCharacter"
              modalType="modalCharacter"
              @result="character = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">
              コミュニケーションツール
              <br class="md:hidden" />
              （複数回答可）
            </h3>
            <button
              class="select-button md:w-6/12 w-10/12"
              type="button"
              @click="openModal('communicationTool')"
            >
              <span v-if="communicationToolValue">
                {{ communicationToolValue }}
              </span>
              <span v-else> 選択する </span>
            </button>
            <modal
              ref="communicationTool"
              modalType="modalCheckBox"
              modalSet="communicationTool"
              @result="communicationToolList = $event"
              @checkboxes="communicationToolValue = $event"
            ></modal>
          </div>
          <div class="caption">
            <h3 class="single">
              プレイするハード

              <br class="md:hidden" />
              （複数回答可）
            </h3>
            <button
              class="select-button md:w-6/12 w-10/12"
              type="button"
              @click="openModal('platform')"
            >
              <span v-if="platformValue">
                {{ platformValue }}
              </span>
              <span v-else> 選択する </span>
            </button>
            <modal
              ref="platform"
              modalType="modalCheckBox"
              modalSet="platform"
              @result="platformList = $event"
              @checkboxes="platformValue = $event"
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
                  <span v-if="playTimeWeekend.name">
                    {{ playTimeWeekend.name }}
                  </span>
                  <span v-else> 選択する </span>
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
                  <span v-if="playTimeHoriday.name">
                    {{ playTimeHoriday.name }}
                  </span>
                  <span v-else> 選択する </span>
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
              <div class="md:w-4/12 w-10/12" v-for="index in 3" :key="index">
                <button
                  class="select-button md:w-full w-10/12"
                  type="button"
                  @click="openArrayModal('styles', index - 1)"
                >
                  <span v-if="styleList[index - 1].name">
                    {{ styleList[index - 1].name }}
                  </span>
                  <span v-else> 選択する </span>
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
              <span v-if="rank.name">
                {{ rank.name }}
              </span>
              <span v-else> 選択する </span>
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
              <span v-if="history.name">
                {{ history.name }}
              </span>
              <span v-else> 選択する </span>
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
import background from "@/components/background.vue";

export default {
  data() {
    return {
      playerName: "",
      character: {},
      playTimeWeekend: {},
      playTimeHoriday: {},
      platformList: [],
      communicationToolList: [],
      styleList: [{}, {}, {}],
      rank: {},
      history: {},
      resultImage: "",
      communicationToolValue: "",
      platformValue: "",
    };
  },
  components: {
    modal,
    canvasArea,
    customFooter,
    save,
    policy,
    background,
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
        character: this.character,
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
.frame {
  /* background: rgba(0, 4, 59, 0.6); */
  z-index: 100;
  position: relative;
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
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  padding: 15px 60px 15px 60px;
  background-color: rgba(0, 4, 59, 0.6);
  color: #cadceb;
  /* text-shadow: 0 0 2px aqua; */
  font-family: "Noto Sans JP", sans-serif;
}
.textbox:focus {
  /* box-shadow: 0 0 5px 0 rgba(211, 87, 104, 0.6); */
  outline: none;
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
}
.container {
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
