<template>
  <div>
    <button v-show="colorMode == 'light'" @click="toggleColorMode()" class="button-logout">
      <font-awesome-icon icon="fa-solid fa-moon" />
    </button>

    <button v-show="colorMode == 'dark'" @click="toggleColorMode()" class="button-logout">
      <font-awesome-icon icon="fa-solid fa-sun" />
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'SwitchColorMode',
  comments: {
    FontAwesomeIcon
  },
  data() {
    return {
      colorMode : 'light',
    }
  },
  methods: {
    toggleColorMode() {
      if (process.client) {
        if (this.colorMode == 'light') {
          document.body.className = 'dark-mode';
          this.colorMode = 'dark';
        } else {
          document.body.className = 'light-mode';
          this.colorMode = 'light';
        }
      }
    }
  }
}
</script>

<style scoped>
  button {
    width: 47px;
    height: 47px;
    background-color: transparent;
    border: none;
    color : var(--icon-color)
  }
</style>
