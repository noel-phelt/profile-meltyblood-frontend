<template>
  <div class="characters">
    <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
      <div
        v-for="(value, key) in characters"
        :key="key"
        class="character-item"
        :class="{ selected: value === character }"
      >
        <button class="character-button" @click="selectCharacter(value)">
          <div class="flex flex-col items-center p-2">
            <img
              class="character-image mb-2"
              id="character_id"
              :src="value.img"
              :alt="key"
            />
            <span class="character-name">{{ value.name }}</span>
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
.characters {
  padding: 1rem;
}
.character-item {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.character-button {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
}
.character-name {
  color: #cadceb;
  font-family: "Noto Serif JP", serif;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}
.character-item:hover .character-button {
  background: rgba(255, 255, 255, 0.05);
  border-color: #37b7ff;
  box-shadow: 0 0 15px rgba(55, 183, 255, 0.3);
  transform: translateY(-2px);
}
.character-item:hover .character-name {
  color: #37b7ff;
  text-shadow: 0 0 10px rgba(55, 183, 255, 0.8);
}
.character-item:hover .character-image {
  filter: drop-shadow(0 0 8px rgba(55, 183, 255, 0.6));
}
.character-item.selected .character-button {
  border-color: #37b7ff;
  background: rgba(55, 183, 255, 0.1);
  box-shadow: 0 0 20px rgba(55, 183, 255, 0.4);
}
.character-item.selected .character-name {
  color: #37b7ff;
  font-weight: bold;
}
</style>
