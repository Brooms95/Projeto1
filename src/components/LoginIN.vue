<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div v-if="user" class="welcome">
          <p>Bem-vindo, {{ user.email }}</p>
          <button @click="logout" class="btn btn-primary">Logout</button>
        </div>
        <div v-else>
          <form v-if="!registerMode" @submit.prevent="login">
            <h2>Login</h2>
            <div class="form-group">
              <input v-model="email" type="email" class="form-control" placeholder="Email" required>
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            </div>
            <div v-if="loginError" class="text-danger">{{ loginError }}</div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" @click="toggleRegisterMode" class="btn btn-link">Registrar</button>
          </form>
          <form v-else @submit.prevent="register">
            <h2>Registrar</h2>
            <div class="form-group">
              <input v-model="email" type="email" class="form-control" placeholder="Email" required>
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            </div>
            <div v-if="registerError" class="text-danger">{{ registerError }}</div>
            <button type="submit" class="btn btn-primary">Registrar</button>
            <button type="button" @click="toggleRegisterMode" class="btn btn-link">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  name: 'LoginIN',
  setup() {
    const auth = getAuth()
    const user = ref(auth.currentUser)
    const email = ref('')
    const password = ref('')
    const registerMode = ref(false)
    const emailError = ref('')
    const loginError = ref('')
    const registerError = ref('')

    const login = async () => {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email.value, password.value)
        user.value = userCred.user
        loginError.value = ''
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            emailError.value = 'Email inválido'
            break
          case 'auth/user-not-found':
            loginError.value = 'Usuário não encontrado'
            break
          case 'auth/wrong-password':
            loginError.value = 'Senha incorreta'
            break
          default:
            console.error(error.message)
            loginError.value = 'Erro ao fazer login'
        }
      }
    }

    const register = async () => {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value)
        user.value = userCred.user
        registerError.value = ''
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            emailError.value = 'Email inválido'
            break
          case 'auth/email-already-in-use':
            registerError.value = 'O email já está em uso'
            break
          default:
            console.error(error.message)
            registerError.value = 'Erro ao registrar'
        }
      }
    }

    const logout = async () => {
      try {
        await signOut(auth)
        user.value = null
      } catch (error) {
        console.error(error.message)
      }
    }

    const toggleRegisterMode = () => {
      registerMode.value = !registerMode.value
      resetErrors()
    }

    const resetErrors = () => {
      emailError.value = ''
      loginError.value = ''
      registerError.value = ''
    }

    return { user, email, password, registerMode, emailError, loginError, registerError, login, register, logout, toggleRegisterMode }
  }
}
</script>

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

</style>