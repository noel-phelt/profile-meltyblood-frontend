<template>
  <div>
    <h1>Preview</h1>
    <canvas
      ref="canvas"
      class="canvasArea"
      id="canvas"
      width="1200"
      height="675"
    ></canvas>
    <div class="canvas-image md:w-[598px] md:h-[336px] w-full h-full">
      <img id="output" :src="canvasOutput" />
    </div>
  </div>
</template>
<script>
import { CANVAS_CONFIG } from "@/data/canvas_config.js";

export default {
  props: {
    canvasDataSet: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      canvasOutput: "",
      profileCardDataURL: "",
    };
  },
  watch: {
    canvasDataSet: {
      handler: async function () {
        this.ctx.clearRect(
          0,
          0,
          CANVAS_CONFIG.canvas.width,
          CANVAS_CONFIG.canvas.height
        );
        await this.drawCard();
        await this.drawPlatform();
        await this.drawCommunicationTool();
        this.drawPlayerName();
        this.drawPlayTime();
        this.drawStyle();
        this.drawSelectName(
          this.canvasDataSet.rank.name,
          CANVAS_CONFIG.rank.x,
          CANVAS_CONFIG.rank.y
        );
        this.drawSelectName(
          this.canvasDataSet.history.name,
          CANVAS_CONFIG.history.x,
          CANVAS_CONFIG.history.y
        );
        this.canvasOutput = this.$refs.canvas.toDataURL("image/png");
        this.$emit("resultImage", this.canvasOutput);
      },
      deep: true,
    },
  },
  methods: {
    async drawCard() {
      const image = new Image();
      image.crossOrigin = "anonymous";
      if (Object.keys(this.canvasDataSet.character).length !== 0) {
        image.src = this.canvasDataSet.character.card;
      } else {
        image.src = this.$DEFAULT_PROFILE_CARD;
      }
      await new Promise((resolve) => {
        image.onload = () => resolve(image);
      });
      this.ctx.drawImage(image, 0, 0);
    },
    drawPlayerName() {
      this.ctx.font = `${CANVAS_CONFIG.playerName.fontSize} ${CANVAS_CONFIG.font.family}`;
      this.ctx.fillText(
        this.canvasDataSet.playerName,
        CANVAS_CONFIG.playerName.x,
        CANVAS_CONFIG.playerName.y
      );
      this.setFontConfig(); // 他の項目のためにデフォルトに戻す
    },
    drawPlayTime() {
      if (this.canvasDataSet.playTimeWeekend.name) {
        this.ctx.fillText(
          CANVAS_CONFIG.playTime.weekend.label.text,
          CANVAS_CONFIG.playTime.weekend.label.x,
          CANVAS_CONFIG.playTime.weekend.label.y
        );
        this.ctx.fillText(
          this.canvasDataSet.playTimeWeekend.name,
          CANVAS_CONFIG.playTime.weekend.value.x,
          CANVAS_CONFIG.playTime.weekend.value.y
        );
      }
      if (this.canvasDataSet.playTimeHoriday.name) {
        this.ctx.fillText(
          CANVAS_CONFIG.playTime.holiday.label.text,
          CANVAS_CONFIG.playTime.holiday.label.x,
          CANVAS_CONFIG.playTime.holiday.label.y
        );
        this.ctx.fillText(
          this.canvasDataSet.playTimeHoriday.name,
          CANVAS_CONFIG.playTime.holiday.value.x,
          CANVAS_CONFIG.playTime.holiday.value.y
        );
      }
    },
    drawStyle() {
      CANVAS_CONFIG.style.items.forEach((pos, index) => {
        this.drawSelectName(
          this.canvasDataSet.styleList[index].name,
          pos.x,
          pos.y
        );
      });
    },
    drawSelectName(select, x, y) {
      let displaySelectName;
      if (select) {
        displaySelectName = select;
      } else {
        displaySelectName = "";
      }
      this.ctx.fillText(displaySelectName, x, y);
    },
    async drawPlatform() {
      await Promise.all(
        this.$checkbox.platform.map(async (value) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = value.imgOff;
          this.canvasDataSet.platformList.forEach((platform) => {
            if (value.id === platform.id) {
              image.src = value.imgOn;
            }
          });
          await new Promise((resolve) => {
            image.onload = () => {
              this.ctx.drawImage(
                image,
                value.x,
                value.y,
                value.width,
                value.height
              );
              resolve(image);
            };
          });
        })
      );
    },
    async drawCommunicationTool() {
      let x = CANVAS_CONFIG.communicationTool.startX;
      let imageList = Array(this.canvasDataSet.communicationToolList.length);
      await Promise.all(
        this.canvasDataSet.communicationToolList.map(async (value, index) => {
          imageList[index] = new Image();
          imageList[index].crossOrigin = "anonymous";
          imageList[index].src = value.img;
          await new Promise((resolve) => {
            imageList[index].onload = () => {
              resolve(imageList[index]);
            };
          });
        })
      );
      imageList.forEach((value, index) => {
        this.ctx.drawImage(
          value,
          x,
          this.canvasDataSet.communicationToolList[index].y,
          this.canvasDataSet.communicationToolList[index].width,
          this.canvasDataSet.communicationToolList[index].height
        );
        x +=
          this.canvasDataSet.communicationToolList[index].width +
          CANVAS_CONFIG.communicationTool.spacing;
      });
    },

    setFontConfig() {
      this.ctx.font = `${CANVAS_CONFIG.font.defaultSize} ${CANVAS_CONFIG.font.family}`;
      this.ctx.fillStyle = CANVAS_CONFIG.font.color;
      this.ctx.textBaseline = "top";
      this.ctx.textAlign = "left";
    },
  },
  async mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.setFontConfig();
    await this.drawCard("");
    this.canvasOutput = this.$refs.canvas.toDataURL("image/png");
    this.$emit("resultImage", this.canvasOutput);
  },
};
</script>

<style scoped>
h1 {
  background: -webkit-linear-gradient(top, aliceblue, #8bb2db);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Noto Serif JP";
  font-size: 40px;
  text-align: center;
  text-shadow: 0 0 5px #a6d5ef;
  margin-bottom: 10px;
}
.canvasArea {
  display: none;
}
.canvas-image {
  margin: auto;
}
.canvas-image img {
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
}
</style>
