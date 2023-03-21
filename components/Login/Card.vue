<template>
  <div class="card-login">
    <div class="card-login-header">
      <span class="title-card-login">ToDo App | Login</span>
    </div>

    <div class="form-group-card-login">
      <label class="label-card-login">E-mail</label>
      <input v-model="credentials.email" type="text" class="input-card-login" />

      <label class="label-card-login">Password</label>
      <input v-model="credentials.password" type="text" class="input-card-login" />

      <button type="button" class="button-login" @click="login()">Login</button>
      <NuxtLink class="button-voltar" to="/register">
          Register
    </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Card',
  data() {
    return {
        credentials : {
          email : null,
          password : null,
        }
    }
  },
  methods : {
    getCsrfToken(){
      return this.$axios.get('/sanctum/csrf-cookie')
      .then(response => {

      })
      .catch(err => {

      });
    },
    login(){
      if (!this.credentials.email || !this.credentials.password) {
        return;
      }

      this.$axios.post('/api/v1/auth/login', this.credentials);
    }
  },
  mounted() {
    this.getCsrfToken();
  }
}
</script>

<style scoped>
  .card-login {
    width: 350px;
    border : 1px solid #777777;
    margin: 0 auto;
    margin-top: 80px;
    border-radius: 3px;
  }

  .card-login-header{
    text-align: center;
    margin-top: 20px;
  }

  .input-card-login {
    width: 90%;
    margin-left: 5%;
    padding: 6px;
    margin-bottom: 15px;
  }

  .input-card-login:focus-within {
    border: 2px solid #8E4BE6;
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  .label-card-login {
    margin-left: 5%;
    font-weight: bold;
  }

  .form-group-card-login {
    display: grid;
    gap : 4;
    flex-wrap: wrap;
    align-self: flex-end;
  }

  .button-login {
    margin: 0 auto;
    padding: 6px;
    width: 50%;
    border-radius: 3px;
    border: none;
    margin-bottom: 15px;
    color: white;
    font-weight: 600;
    background-color: #8E4BE6;
  }

  .button-login:hover {
    filter: brightness(0.9);
  }

  .button-voltar {
    margin: 0 auto;
    padding: 6px;
    width: 50%;
    border-radius: 3px;
    border: none;
    margin-bottom: 15px;
    color: white;
    font-weight: 600;
    background-color: #E64D3D;
    text-align: center;
    text-decoration: none;
  }

  .button-voltar:hover {
    filter: brightness(0.9);
  }

  .title-card-login {
    font-size: 18px;
    margin: 10px auto;
    font-weight: bold;
    text-align: center;
  }

  @media screen and (min-width: 600px) {
    .card-login {
      width: 400px;
    }
  }
</style>
