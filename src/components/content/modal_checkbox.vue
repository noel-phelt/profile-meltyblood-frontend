
<template>
  <div class="checkboxs grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="checkbox-area" v-for="value in checkBoxSets" :key="value.id">
      <input
        class="checkbox"
        type="checkbox"
        v-model="checkedList"
        :value="value"
        :id="`${modalSet}${value.id}`"
      />
      <label class="checkbox-label" :for="`${modalSet}${value.id}`">
        {{ value.name }}
      </label>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      checkedList: [],
    };
  },
  computed: {
    checkBoxSets() {
      return this.$checkbox[this.modalSet];
    },
    checkedListSorted() {
      return this.checkedList.sort(this.compare);
    },
  },
  methods: {
    compare(a, b) {
      const aID = a.id;
      const bID = b.id;
      let comparison = 0;
      if (aID > bID) {
        comparison = 1;
      } else if (aID < bID) {
        comparison = -1;
      }
      return comparison;
    },
    completeModal() {
      this.$emit("completeModal", this.checkedListSorted);
    },
  },
};
</script>
<style scoped>
.checkbox-label {
  display: block;
  cursor: pointer;
  color: aliceblue;
  background-color: rgba(93, 93, 93, 0.3);
  font-family: "Noto Serif JP", serif;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 2px white, 0 0 15px #134f9a;
  /* background-color: rgb(165, 165, 165); */
  text-align: center;
  font-size: 20px;
  padding: 20px 0px 20px 0px;
}

input[type="checkbox"] {
  display: none;
}

.checkbox-label:hover {
  box-shadow: 0 0 2px white, 0 0 15px #134f9a, 0 0 2px white, 0 0 15px #134f9a;
}
input[type="checkbox"]:checked + .checkbox-label {
  background-color: rgb(189, 162, 42);
}
</style>
