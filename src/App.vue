<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar' 
import messages from "@/tools/messages"
export default {
  components: {
    Navbar
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
        error(){
            return this.$store.getters.error
        }
  },
  watch: {
        error(fbError) {
            this.$error(messages[fbError.code]) 
        }
    }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
