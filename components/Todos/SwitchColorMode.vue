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

export default {
  name: 'SwitchColorMode',
  data() {
    return {
      colorMode : 'light',
    }
  },
  mounted() {
    const cookieColorMode = this.getCookieColorMode();
    if (cookieColorMode != null) {
      this.colorMode = cookieColorMode;
    }

    this.applyColorMode();
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
        this.setCookieColorMode();
      }
    },
    applyColorMode() {
      if (process.client) {
        if (this.colorMode == 'light') {
          document.body.className = 'light-mode';
        } else {
          document.body.className = 'dark-mode';
        }
        this.setCookieColorMode();
      }
    },
    setCookieColorMode() {
      if (process.client) {
        const d = new Date();
        d.setTime(d.getTime() + (60*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = 'color_mode_to_app' + "=" + this.colorMode + ";" + expires + ";path=/";
      }
    },
    getCookieColorMode() {
      if (process.client) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${'color_mode_to_app'}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
