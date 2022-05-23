
<template>
  <div class="grid grid-cols-2 md:grid-cols-3">
    <ul>
      <li
        v-for="(value, key) in characters"
        :key="key"
        class="character col-span-1"
      >
        <a @click="selectCharacter(value)">
          <p class="character-name">{{ value.name }}</p>
          <img id="character_id" :src="value.img" :alt="key" />
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      character: {},
    };
  },
  props: {
    modalType: {
      type: String,
      default: "",
    },
  },
  computed: {
    characters() {
      return this.$characters;
    },
  },
  methods: {
    selectCharacter(character) {
      this.character = character;
      this.completeModal();
    },
    completeModal() {
      this.$emit("completeModal", this.character);
    },
  },
};
</script>
<style>
.character {
  text-align: center;
}
.character-image {
}
.character-image img {
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
.character:hover .character-name {
  text-shadow: 0 0 15px white;
}
</style>
