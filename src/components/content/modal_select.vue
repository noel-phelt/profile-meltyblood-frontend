
<template>
  <div class="grid grid-cols-2 md:grid-cols-3">
    <ul>
      <li
        v-for="(value, key) in optionSets"
        :key="key"
        class="option col-span-1"
      >
        <a @click="selectOption(value)">
          <p class="option-name">{{ value }}</p>
        </a>
      </li>
    </ul>
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
  text-align: center;
}
.option-name {
  color: #cadceb;
  text-shadow: 0 0 5px white;
  text-align: center;
  font-family: "Noto Serif JP", serif;
}
a:not([href]):not([class]) {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.option:hover .option-name {
  text-shadow: 0 0 15px white;
}
</style>
