<template>
  <div>
    <div class="modal modal-overlay" @click.self="closeModal" v-show="modal">
      <transition name="modal">
        <div class="modal modal-window">
          <div class="modal-content">
            <component
              ref="modalContent"
              :is="modalType"
              :modalSet="modalSet"
              @completeModal="completeModal($event)"
            ></component>
          </div>
          <footer class="modal-footer">
            <slot name="footer">
              <button @click="closeModal">Close</button>
            </slot>
          </footer>
        </div>
      </transition>
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

    completeModal(result) {
      switch (this.modalType) {
        case "modalCharacter": //{1: "遠野"}
          this.$emit("result", result.card);
          break;
        case "modalCheckBox":
          this.$emit("result", result);
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
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: rgba(0, 4, 59, 0.6);
  /* width: 90%;
  height: 90%; */
  overflow-y: auto;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
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
  background: #ccc;
  padding: 10px;
  text-align: right;
}
</style>
