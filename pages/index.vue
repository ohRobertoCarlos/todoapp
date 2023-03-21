<template>
  <div>
    <p>Hello World!</p>
    <NuxtLink to="/register">Register</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>

<script>
import { getAccessToken } from '~/Utils/authentication';
export default {
  name: 'IndexPage',
  beforeCreate() {
    if (!getAccessToken()) {
      this.$router.push({name:'Login'});
    }
  }
}
</script>
