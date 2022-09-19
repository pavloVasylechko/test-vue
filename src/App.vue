<template>
  <div id="app">
    <DropDown :cities="allCities"/>
  </div>
</template>

<script>
import DropDown from './components/DropDown.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components:{
    DropDown
  },
  computed:{
    ...mapGetters("cities",["allCities"])
  },
  methods:{
    ...mapActions("cities",["getAllCities"])
  },
  async mounted(){
    await this.getAllCities()
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
#app{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
