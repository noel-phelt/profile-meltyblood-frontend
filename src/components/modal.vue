<template>
  <div>
    <div class="modal modal-overlay" @click.self="closeModal" v-show="modal">
      <div class="modal modal-window md:w-9/12 w-11/12">
        <component
          class="modal content"
          ref="modalContent"
          :is="modalType"
          :modalSet="modalSet"
          @completeModal="completeModal($event)"
        ></component>
        <footer class="modal-footer">
          <slot name="footer">
            <button class="clear" @click="clear">未選択にする</button>
            <button class="close" @click="closeModal">閉じる</button>
          </slot>
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
  text-align: right;
}

footer button {
  display: inline-block;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  text-shadow: 0 0 2px white, 0 0 15px #134f9a;
  color: aliceblue;
  padding: 15px 0px 15px 0px;
  margin: 10px 20px 10px 0;
  width: 150px;
  font-family: "Noto Serif JP", serif;
}
footer button:hover {
  box-shadow: 0 0 2px white, 0 0 15px #134f9a, 0 0 2px white, 0 0 15px #134f9a;
}
</style>
