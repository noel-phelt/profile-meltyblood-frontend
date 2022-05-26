
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <button
      v-for="value in optionSets"
      :key="value.id"
      :class="{ selected: value === option }"
      class="option"
      @click="selectOption(value)"
    >
      <span class="option-name">{{ value.name }}</span>
    </button>
  </div>
</template>
<script>
import { optionSets } from "@/data/option_set.js";
export default {
  data() {
    return {
      option: {},
    };
  },
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
  computed: {
    optionSets() {
      return optionSets[this.modalSet];
    },
  },
  methods: {
    selectOption(option) {
      this.option = option;
      this.completeModal();
    },
    completeModal() {
      this.$emit("completeModal", this.option);
    },
  },
};
</script>
<style scoped>
.option {
  color: aliceblue;
  background-color: rgba(93, 93, 93, 0.3);
  font-family: "Noto Serif JP", serif;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  text-align: center;
  font-size: 20px;
  padding: 20px 0px 20px 0px;
}
.option:hover {
  text-shadow: 0 0 5px white;
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  background-color: rgba(181, 181, 181, 0.3);
}
.option.selected {
  text-shadow: 0 0 5px white;
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  background-color: rgba(181, 181, 181, 0.3);
}
</style>
