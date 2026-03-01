<template>
  <div>
    <div class="modal modal-overlay" @click.self="closeModal" v-show="modal">
      <div class="modal modal-window md:w-9/12 w-11/12">
        <component
          class="modal content"
          ref="modalContent"
          :is="modalType"
          :modalSet="modalSet"
          :contentValue="contentValue"
          :contentList="contentList"
          @completeModal="completeModal($event)"
        ></component>
        <footer class="modal-footer">
          <button class="close w-5/12 md:w-[150px]" @click="closeModal">
            閉じる
          </button>
          <button class="clear w-5/12 md:w-[150px]" @click="clear">
            未選択にする
          </button>
        </footer>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import modalCharacter from "@/components/content/modal_character.vue";
import modalCheckBox from "@/components/content/modal_checkbox.vue";
import modalSelect from "@/components/content/modal_select.vue";
export default {
  props: {
    modalType: {
      type: String,
      default: "",
    },
    modalSet: {
      type: String,
      default: "",
    },
    contentValue: {
      type: Number,
      default: null,
    },
    contentList: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  components: {
    modalCharacter,
    modalCheckBox,
    modalSelect,
  },
  computed: {
    component: function () {
      return this.componentTypes[this.current];
    },
  },
  data() {
    return {
      message: "",
      modal: false,
    };
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.$refs.modalContent.completeModal();
      this.modal = false;
    },
    clear() {
      this.$refs.modalContent.clearContent();
    },

    completeModal(result) {
      switch (this.modalType) {
        case "modalCharacter":
          this.$emit("result", result);
          break;
        case "modalCheckBox":
          this.$emit("result", result);
          const checkboxButtonName = result
            .map((object) => object.name)
            .join(" ");
          this.$emit("checkboxes", checkboxButtonName);
          break;
        case "modalSelect":
          this.$emit("result", result);
          break;
        default:
          break;
      }
      this.modal = false;
    },
  },
};
</script>


<style scoped>
.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.modal-window {
  background: rgba(0, 4, 59, 0.9);
  margin: auto;
  max-width: 1000px;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  /* opacity: 0; */
  transition: opacity 0.5s, transform 0s 0.5s;
  /* transform: scale(0); */
}
.modal.content {
  margin: 20px 10px 10px 20px;
  padding: 40px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

.modal-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.modal-enter-to {
  opacity: 1;
  transform: scale(1);
}
.modal-enter-active {
  transition: opacity 300ms ease-in, transform 300ms ease-in;
}
.modal-leave {
  opacity: 1;
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.modal-leave-active {
  transition: opacity 300ms ease-in, transform 270ms ease-in;
}

.modal-footer {
  padding: 10px;
}

footer button {
  display: block;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  box-shadow: 0 0 10px rgba(19, 79, 154, 0.5);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  color: aliceblue;
  padding: 10px 0px 10px 0px;
  margin: 10px 20px 10px auto;
  font-family: "Noto Serif JP", serif;
  transition: all 0.3s ease;
}
footer button:hover {
  box-shadow: 0 0 10px white, 0 0 25px #37b7ff;
  background: linear-gradient(135deg, transparent, rgba(138, 43, 226, 0.2));
  transform: translateY(-1px);
}
</style>
