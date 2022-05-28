
<template>
  <div class="characters">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-2">
      <div
        v-for="(value, key) in characters"
        :key="key"
        class="character"
        :class="{ selected: value === character }"
      >
        <button @click="selectCharacter(value)">
          <div>
            <span class="character-name">{{ value.name }} </span>
            <img
              class="character-image"
              id="character_id"
              :src="value.img"
              :alt="key"
            />
          </div>
        </button>
      </div>
    </div>
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
    clearContent() {
      this.character = {};
    },
  },
};
</script>
<style scoped>
.character {
  text-align: center;
  margin-bottom: 20px;
}
.character-image {
  /* background-color: rgba(93, 93, 93, 0.3); */
  border-radius: 0;
}

.character-name {
  display: inline-block;
  height: 50px;
  text-align: center;
  color: #cadceb;
  text-shadow: 0 0 5px white;
  font-family: "Noto Serif JP", serif;
}
a:not([href]):not([class]) {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.character:hover .character-name {
  text-shadow: 0 0 5px white, 0 0 5px white;
}
.character:hover .character-image {
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 15px #134f9a);
}
.character.selected .character-image {
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 15px #134f9a);
}
.character.selected .character-name {
  text-shadow: 0 0 5px white, 0 0 5px white;
}
</style>
