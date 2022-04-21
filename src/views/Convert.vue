<template>
    <div class="container">
        <div class="row z-depth-5" style="margin-top: 40px;"> 
            <div class="col s6" ref="burger">
                <div class="input-field col s10">
                  <ul class="tabs">
                     <li @click.prevent="setValute('RUB',1), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute1 == 'RUB'}"><a class="blue-text" href="">RUB</a></li>
                     <li @click.prevent="setValute('USD',1), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute1 == 'USD'}"><a class="blue-text" href="">USD</a></li>
                     <li @click.prevent="setValute('EUR',1), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute1 == 'EUR'}"><a class="blue-text" href="">EUR</a></li>
                     <li class="tab col s3" :class="{'grey lighten-2': (valute1 != 'RUB' && valute1 != 'EUR' && valute1 != 'USD')}">
                         <a
                        class='dropdown-trigger blue-text' 
                        href='#' 
                        data-target='dropdown1'
                        ref="dropdown1"
                        ><i class="material-icons"><a class="blue-text" v-if="valute1 != 'RUB' && valute1 != 'EUR' && valute1 != 'USD'">{{valute1}} </a>keyboard_arrow_down</i></a>
                        <ul id='dropdown1' class='dropdown-content'>
                        <li><a @click.prevent="setValute(rate.id,1), convert(1)" class="blue-text" v-for="rate in table" :key="rate.id">{{rate.id}}</a></li>
                        </ul>
                     </li>
                  </ul>
                </div>
                <div class="input-field col s10">
                     <input @blur="convert(1)" v-model.trim="price1" type="text">
                     <label class="active">Сумма {{valute1}}</label>
                </div>
                <label class="col s10">Дата обновления данных: {{updateTime}}</label>
            </div>
            <div class="col s6">
                <div class="input-field col s10">
                   <ul class="tabs">
                     <li @click.prevent="setValute('RUB',2), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute2 == 'RUB'}"><a class="blue-text" href="">RUB</a></li>
                     <li @click.prevent="setValute('USD',2), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute2 == 'USD'}"><a class="blue-text" href="">USD</a></li>
                     <li @click.prevent="setValute('EUR',2), convert(1)" class="tab col s3" :class="{'grey lighten-2': valute2 == 'EUR'}"><a class="blue-text" href="">EUR</a></li>
                     <li class="tab col s3" :class="{'grey lighten-2': (valute2 != 'RUB' && valute2 != 'EUR' && valute2 != 'USD')}">
                         <a
                        class='dropdown-trigger blue-text' 
                        href='#' 
                        data-target='dropdown2'
                        ref="dropdown2"
                        ><i class="material-icons"><a class="blue-text" v-if="valute2 != 'RUB' && valute2 != 'EUR' && valute2 != 'USD'">{{valute2}} </a>keyboard_arrow_down</i></a>
                        <ul id='dropdown2' class='dropdown-content'>
                        <li><a @click.prevent="setValute(rate.id,2), convert(1)" class="blue-text" v-for="rate in table" :key="rate.id">{{rate.id}}</a></li>
                        </ul>
                     </li>
                  </ul>
                </div>
                <div class="input-field col s10">
                     <input @blur="convert(2)" v-model.trim="price2" type="text">
                     <label class="active">Сумма {{valute2}}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment' 
import fx from 'money'
import valutes from "@/tools/valute"
import M from 'materialize-css'
export default {
    data: () => ({
        select: null,
        currency: {},
        table: {},
        valute1: 'RUB',
        valute2: 'RUB' ,
        price1: 0.0000,
        price2: 0.0000,
        dropdown1: null,
        dropdown2: null,
        updateTime: null
    }),
    async mounted() {
        this.dropdown1 = M.Dropdown.init(this.$refs.dropdown1, {container: this.$refs.burger})
        this.dropdown2 = M.Dropdown.init(this.$refs.dropdown2, {container: this.$refs.burger})
        this.currency = await this.$store.dispatch('fetchCurrency')
        fx.rates = this.currency.rates;
        fx.base = this.currency.base;
        this.updateTime = moment(this.currency.date).local(true).format('YYYY-MM-DD HH:mm:ss Z UTC')
        this.table = this.currency.rates
        this.table = Object.keys(this.table).map(key => ({ ...this.table[key], id: key, price: fx.convert(1, {from: key, to: "RUB"}), valute: valutes[key] }))
        console.log(this.currency)
    },
    methods: {
        setValute(valute, priceid){
            console.log(valute, priceid)
            if (priceid == 1)
            {
                this.valute1 = valute
            }
            else
            {
                this.valute2 = valute
            }
        },
        convert(priceid){
            if (priceid == 1)
            {
                if (this.valute1 == this.valute2) this.price2 = this.price1
                else
                this.price2 = fx.convert(this.price1, {from: this.valute1, to: this.valute2})           
            }
            else
            {
                if (this.valute1 == this.valute2) this.price1 = this.price2
                else
                this.price1 = fx.convert(this.price2, {from: this.valute2, to: this.valute1})
            }
        }
    },
    beforeDestroy() {
      if (this.dropdown1 && this.dropdown1.destroy) {
      this.dropdown1.destroy()
    }
    if (this.dropdown2 && this.dropdown2.destroy) {
      this.dropdown2.destroy()
    }
    }
}
</script>