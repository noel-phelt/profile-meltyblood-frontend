<template>
  <div class="characters">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
      <div
        v-for="(value, key) in characters"
        :key="key"
        class="character-item"
        :class="{ selected: value === character }"
      >
        <button class="character-button" @click="selectCharacter(value)">
          <div class="character-card-inner">
            <div class="character-name-label">
              <span class="character-name">{{ value.name }}</span>
            </div>
            <div class="character-image-wrapper">
              <div class="character-bg-glow"></div>
              <img
                class="character-image"
                id="character_id"
                :src="value.img"
                :alt="key"
              />
            </div>
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
.character-card-inner {
  display: flex;
  flex-direction: column;
  height: 360px;
  position: relative;
  overflow: hidden;
}
.character-image-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1;
}
.character-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background: radial-gradient(
    circle,
    rgba(55, 183, 255, 0.2) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  border-radius: 50%;
  z-index: -1;
  transition: all 0.5s ease;
}
.character-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.7));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.character-name-label {
  background: rgba(0, 0, 0, 0.4);
  padding: 0.75rem 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 2;
}
.character-name {
  color: #cadceb;
  font-family: "Noto Serif JP", serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-align: center;
  line-height: 1.3;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.character-item:hover .character-button {
  background: rgba(255, 255, 255, 0.12);
  border-color: #37b7ff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(55, 183, 255, 0.2);
  transform: translateY(-10px) scale(1.02);
}
.character-item:hover .character-bg-glow {
  width: 90%;
  height: 90%;
  background: radial-gradient(
    circle,
    rgba(55, 183, 255, 0.35) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}
.character-item:hover .character-image {
  filter: drop-shadow(0 0 20px rgba(55, 183, 255, 0.5));
  transform: scale(1.1) translateY(-5px);
}
.character-item:hover .character-name {
  color: #fff;
  text-shadow: 0 0 15px rgba(55, 183, 255, 0.8);
}

.character-item.selected .character-button {
  border-color: #37b7ff;
  background: rgba(55, 183, 255, 0.15);
  box-shadow: 0 0 40px rgba(55, 183, 255, 0.4),
    inset 0 0 20px rgba(55, 183, 255, 0.2);
}
.character-item.selected .character-bg-glow {
  background: radial-gradient(
    circle,
    rgba(55, 183, 255, 0.4) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}
.character-item.selected .character-name {
  color: #37b7ff;
  font-weight: bold;
}
.character-item.selected .character-image {
  filter: drop-shadow(0 0 25px rgba(55, 183, 255, 0.7));
}
</style>
