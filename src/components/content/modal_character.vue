<template>
  <div class="characters">
    <div class="character-grid">
      <div
        v-for="(value, key) in characters"
        :key="key"
        class="character-item"
        :class="{
          selected: value === character,
          'selection-burst': value === effectCharacter,
        }"
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
      effectCharacter: null,
      completeTimer: null,
      effectTimer: null,
    };
  },
  props: {
    modalType: {
      type: String,
      default: "",
    },
    contentValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    characters() {
      return this.$characters;
    },
  },
  watch: {
    contentValue: {
      handler(value) {
        this.character = value || {};
      },
      immediate: true,
    },
  },
  methods: {
    selectCharacter(character) {
      this.character = character;
      this.effectCharacter = character;
      if (this.effectTimer) {
        clearTimeout(this.effectTimer);
      }
      this.effectTimer = setTimeout(() => {
        this.effectCharacter = null;
        this.effectTimer = null;
      }, 520);
      if (this.completeTimer) {
        clearTimeout(this.completeTimer);
      }
      this.completeTimer = setTimeout(() => {
        this.completeModal();
      }, 560);
    },
    completeModal() {
      if (this.completeTimer) {
        clearTimeout(this.completeTimer);
        this.completeTimer = null;
      }
      this.$emit("completeModal", this.character);
    },
    clearContent() {
      if (this.completeTimer) {
        clearTimeout(this.completeTimer);
        this.completeTimer = null;
      }
      if (this.effectTimer) {
        clearTimeout(this.effectTimer);
        this.effectTimer = null;
      }
      this.effectCharacter = null;
      this.character = {};
    },
  },
  beforeDestroy() {
    if (this.completeTimer) {
      clearTimeout(this.completeTimer);
    }
    if (this.effectTimer) {
      clearTimeout(this.effectTimer);
    }
  },
};
</script>
<style scoped>
.characters {
  padding: 1rem;
  --card-content-offset-x: -6px;
}
.character-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
.character-item {
  position: relative;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.character-item::after {
  content: "";
  position: absolute;
  inset: -8px;
  border: 1px solid rgba(55, 183, 255, 0);
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
}
.character-button {
  display: block;
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s ease;
}
.character-card-inner {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 320px;
  aspect-ratio: 5 / 6;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.character-image-wrapper {
  position: relative;
  display: grid;
  place-items: center;
  padding: 1rem;
  transform: translateX(var(--card-content-offset-x));
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
  display: block;
  max-width: 100%;
  max-height: 92%;
  margin: 0 auto;
  object-fit: contain;
  object-position: center center;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.7));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.character-name-label {
  background: rgba(0, 0, 0, 0.4);
  padding: 0.75rem 0.5rem;
  width: 100%;
  min-width: 0;
  display: grid;
  place-items: center;
  min-height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  transform: translateX(var(--card-content-offset-x));
  z-index: 2;
}
.character-name {
  color: #cadceb;
  font-family: "Noto Serif JP", serif;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 1.3;
  max-width: 100%;
  word-break: normal;
  overflow-wrap: anywhere;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.character-item:hover .character-button {
  background: rgba(255, 255, 255, 0.12);
  border-color: #37b7ff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(55, 183, 255, 0.2);
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

.character-item.selection-burst::after {
  animation: selected-ring-flash 0.52s ease-out;
}
.character-item.selection-burst .character-button {
  box-shadow: 0 0 0 rgba(55, 183, 255, 0), 0 0 36px rgba(55, 183, 255, 0.45),
    inset 0 0 20px rgba(255, 255, 255, 0.08);
}
.character-item.selection-burst .character-bg-glow {
  animation: selected-glow-bloom 0.52s ease-out;
}
.character-item.selection-burst .character-image {
  animation: selected-image-flash 0.52s ease-out;
}

@keyframes selected-ring-flash {
  0% {
    opacity: 0;
    transform: scale(0.96);
    border-color: rgba(55, 183, 255, 0.95);
  }
  35% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1.03);
    border-color: rgba(55, 183, 255, 0);
  }
}

@keyframes selected-glow-bloom {
  0% {
    width: 70%;
    height: 70%;
    opacity: 0.45;
  }
  45% {
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }
  100% {
    width: 90%;
    height: 90%;
    opacity: 1;
  }
}

@keyframes selected-image-flash {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(55, 183, 255, 0));
  }
  40% {
    transform: scale(1.08) translateY(-4px);
    filter: drop-shadow(0 0 30px rgba(55, 183, 255, 0.85));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 25px rgba(55, 183, 255, 0.7));
  }
}

@media (min-width: 1024px) {
  .character-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .character-card-inner {
    min-height: 360px;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .character-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
