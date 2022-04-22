<template>
 <div class="container">
   <table>
        <thead>
          <tr>
              <th>Букв. код</th>
              <th>Валюта</th>
              <th>Курс</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="rate in table" :key="rate.id">
            <td>{{rate.id}}</td>
            <td>{{rate.valute}}</td>
            <td>{{rate.price.toFixed(2)}}₽</td>
          </tr>
        </tbody>
      </table>





  <div id="modal1" class="modal">
    <form class="card auth-card" @submit.prevent="onSubmit" style="margin-bottom: 0px;margin-top: 0px;"> <!-- приминение функции onSubmit на закрытие формы -->
    <div class="card-content">
    <span class="card-title">Авторизация</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) /* email пуст */ || ($v.email.$dirty && !$v.email.email) /* несоответсвует формату email */ }"
      >
      <label for="email">Email</label>
      <small 
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Поле email не должно быть пустым
      </small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Введите корректный Email
      </small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) /* пароль пуст */ || ($v.password.$dirty && !$v.password.minLength)} /* пароль меньше мин.символов */" 
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите пароль</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Пароль должен быть длинее {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
    </div>
  </div>
  <div class="card-action">
    <div class="row">   
      <button class="col s12 btn waves-effect blue waves-light auth-submit" type="submit">Войти</button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
  </form>
  </div>

</div>
</template>

<script>
import valutes from "@/tools/valute"
import messages from "@/tools/messages"
import { required, email, minLength } from 'vuelidate/lib/validators'
import fx from 'money'
import M from 'materialize-css'
export default {
  name: 'home',
  data: () => ({
    modal: null,
    currency: {},
    table: {
    },
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  async mounted() {
    this.modal = M.Modal.init(document.querySelectorAll('.modal'))
    this.currency = await this.$store.dispatch('fetchCurrency')
    fx.rates = this.currency.rates;
    fx.base = this.currency.base;
    this.table = this.currency.rates
    this.table = Object.keys(this.table).map(key => ({ ...this.table[key], id: key, price: fx.convert(1, {from: key, to: "RUB"}), valute: valutes[key] }))
    if (messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit() {      
    if (this.$v.$invalid){
      this.$v.$touch()      // активация валидации
      return
    }
    const formData = { 
      email: this.email,
      password: this.password
    }
    try{
      await this.$store.dispatch('login', formData)
      this.$router.go()
    } catch (e) {}
       
    },
    beforeDestroy() {
        if (this.modal && this.modal.destroy) {
            this.modal.destroy()
        }
    }
  }
}
</script>