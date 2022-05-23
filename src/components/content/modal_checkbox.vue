
<template>
  <div class="grid grid-cols-2 md:grid-cols-3">
    <div class="col-span-1" v-for="value in checkBoxSets" :key="value.id">
      <input type="checkbox" v-model="checkedList" :value="value" />
      <label class="checkBoxArea">
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
.checkBoxArea {
  text-align: center;
  background-color: grey;
  margin: 2%;
  cursor: pointer;
}

input[type="checkbox"] {
  /* display: none; */
}

.checkBoxArea:hover {
  background-color: whitesmoke;
}
input[type="checkbox"]:checked + .checkBoxArea {
  background-color: green;
}
.character-name {
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
</style>
