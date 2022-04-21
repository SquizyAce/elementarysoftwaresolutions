<template>
   <nav>
    <div class="nav-wrapper black">
      <ul id="nav-mobile" class="left">
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/convert">Статистика и Конвертация</router-link></li>
      </ul>
      <a href="#" class="brand-logo center"><img src="@/assets/logo.png" alt=""></a>
      <ul id="nav-mobile" class="right">
        <li v-if="!auth"><a data-target="modal1" class="modal-trigger" href="#">Авторизация</a></li>
       
        <a
         v-else class='dropdown-trigger white-text name' 
         href='#' 
         data-target='dropdown'
         ref="dropdown"
         >{{name}}</a>
        
        <ul id='dropdown' class='dropdown-content'>
          <li><a @click.prevent="logout" class="black-text" href="#!"><i class="material-icons">assignment_return</i>Выйти</a></li>
        </ul>
      </ul>
    </div>
  </nav>
</template>
<script>
import firebase from 'firebase/app'
import M from 'materialize-css'
export default {
  data: () => ({ 
    date: new Date(),  // создание переменной времени
    interval: null,
    dropdown: null
  }),
  computed: {
    auth() {
      return firebase.auth().currentUser
    },
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown)
  },
  methods: {
    async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/?message=logout')
    }
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>