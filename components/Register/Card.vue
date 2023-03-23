<template>
  <div class="card-login">
    <div class="card-login-header">
      <span class="title-card-register">ToDo App | Register</span>
    </div>

    <div class="form-group-card-register">
      <label class="label-card-register">Name:</label>
      <input v-model="userData.name" type="text" class="input-card-register" />

      <label class="label-card-register">E-mail</label>
      <input v-model="userData.email" type="text" class="input-card-register" />

      <label class="label-card-register">Password</label>
      <input v-model="userData.password" type="password" class="input-card-register" />

      <button type="button" @click="register()" class="button-register">Register</button>
      <NuxtLink class="button-voltar" to="/login">
          Voltar
    </NuxtLink>
    </div>
  </div>
</template>

<script>
import { getAccessToken } from '~/Utils/authentication';

export default {
  name : 'Card',
  data() {
    return {
      userData : {
        name : null,
        email : null,
        password : null
      }
    }
  },
  methods : {
    register() {
      if (
        !this.userData.name ||
        !this.userData.email ||
        !this.userData.password
      ) {
        return;
      }

      this.$axios.post('/api/v1/auth/register', this.userData)
      .then(response => {
        this.$router.push({name:'Login'});
      })
      .catch(err => {

      });
    }
  },
  beforeCreate() {
    if (getAccessToken()) {
      this.$router.push({name:'index'});
    }
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

  .input-card-register {
    width: 90%;
    margin-left: 5%;
    padding: 6px;
    margin-bottom: 15px;
  }

  .input-card-register:focus-within {
    border: 2px solid #8E4BE6;
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  .label-card-register {
    margin-left: 5%;
    font-weight: bold;
  }

  .form-group-card-register {
    display: grid;
    gap : 4;
    flex-wrap: wrap;
    align-self: flex-end;
  }

  .button-register {
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

  .button-register:hover {
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

  .title-card-register {
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
