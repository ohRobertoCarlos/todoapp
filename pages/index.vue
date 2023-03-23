<template>

</template>

<script>
import { getAccessToken } from './../Utils/authentication';
export default {
  name : 'Index',
  data() {
    return {}
  },
  beforeCreate() {
    if (!getAccessToken()) {
      this.$router.push({name : 'Login'});
    } else {
      this.$router.push({name : 'todos'});
    }
  }
}
</script>

<style>

</style>
