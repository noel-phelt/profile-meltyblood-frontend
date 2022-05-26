
<template>
  <div class="characters">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-2">
      <div v-for="(value, key) in characters" :key="key" class="character">
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
  },
};
</script>
<style scoped>
.characters {
}
.character {
  text-align: center;
  margin-bottom: 20px;
}
.character-image {
  background-color: rgba(93, 93, 93, 0.3);
  /* background-color: rgba(201, 201, 201, 0.746); */
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
  /* background-color: rgba(201, 201, 201, 0.746); */
  box-shadow: 0 0 5px white, 0 0 20px #134f9a;
}
</style>
