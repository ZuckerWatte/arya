<template>
  <div id="app">
    <Map/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from './components/Map.vue';
import checkBoldIcon from "vue-material-design-icons/CheckBold.vue"
import closeCircleIcon from "vue-material-design-icons/CloseCircle.vue"
 
// global icon components 
Vue.component("check-bold-icon", checkBoldIcon)
Vue.component("close-circle-icon", closeCircleIcon)

@Component({
  components: {
    Map,
  },
})
export default class App extends Vue {}

</script>

<style>
html, body {
  max-height: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
} 

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.check .material-design-icon > .material-design-icon__svg {
  bottom: 0.125rem !important;
}
</style>
