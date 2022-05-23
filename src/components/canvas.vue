<template>
  <div>
    <p>{{ canvasDataSet.characterImage }}</p>
    <canvas
      ref="canvas"
      class="canvasArea"
      id="canvas"
      width="1200"
      height="675"
    ></canvas>
    <div class="canvas-image">
      <img id="output" :src="canvasOutput" />
    </div>
  </div>
</template>
<script>
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
        this.ctx.clearRect(0, 0, 1200, 675);
        await this.drawCard(this.canvasDataSet.profileImage);
        await this.drawPlatform();
        await this.drawCommunicationTool();
        this.drawPlayerName();
        this.drawPlayTime();
        this.drawStyle();
        this.drawRank();
        this.drawHistory();
        this.canvasOutput = this.$refs.canvas.toDataURL("image/png");
        this.$emit("resultImage", this.canvasOutput);
      },
      deep: true,
    },
  },
  methods: {
    async drawCard(path) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = path === "" ? this.$DEFAULT_PROFILE_CARD : path;
      await new Promise((resolve) => {
        image.onload = () => resolve(image);
      });
      this.ctx.drawImage(image, 0, 0);
    },
    drawPlayerName() {
      this.ctx.fillText(this.canvasDataSet.playerName, 31, 191);
    },
    drawPlayTime() {
      if (Object.keys(this.canvasDataSet.playTimeWeekend).length !== 0) {
        this.ctx.fillText("平日", 584, 176);
        this.ctx.fillText(this.canvasDataSet.playTimeWeekend, 584, 215);
      }
      if (Object.keys(this.canvasDataSet.playTimeHoriday).length !== 0) {
        this.ctx.fillText("休日", 584, 281);
        this.ctx.fillText(this.canvasDataSet.playTimeHoriday, 584, 318);
      }
    },
    drawStyle() {
      this.ctx.fillText(this.canvasDataSet.styleList[0], 36, 335);
      this.ctx.fillText(this.canvasDataSet.styleList[1], 36, 397);
      this.ctx.fillText(this.canvasDataSet.styleList[2], 36, 460);
    },
    drawRank() {
      this.ctx.fillText(this.canvasDataSet.rank, 409, 321);
    },
    drawHistory() {
      this.ctx.fillText(this.canvasDataSet.history, 503, 607);
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
      let x = 435;
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
        x += this.canvasDataSet.communicationToolList[index].width + 29;
      });
    },

    setFontConfig() {
      this.ctx.font = "26px Noto Sans JP";
      this.ctx.fillStyle = "#ffffff";
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
.canvasArea {
  display: none;
}
</style>
