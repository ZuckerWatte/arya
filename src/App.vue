<template>
  <div id="app">
    <h1>{{header}}</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <CardStack :cards="countriesFromCards" :next="nextCard" />
      <Navigation :country="currentCountry" @nextCountry="nextCountry" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CardStack from "./components/CardStack.vue";
import Navigation from "./components/Navigation.vue";

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import axios from "axios";

import checkBoldIcon from "vue-material-design-icons/CheckBold.vue";
import closeCircleIcon from "vue-material-design-icons/CloseCircle.vue";

// global icon components
Vue.component("check-bold-icon", checkBoldIcon);
Vue.component("close-circle-icon", closeCircleIcon);
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

@Component({
  components: {
    CardStack,
    Navigation
  }
})
export default class App extends Vue {
  header = "Let's go to ... ";
  public loading: boolean = false;
  public next: boolean = false;
  countries: [] = [];
  selectedCountries: {}[] = [];
  cards: number[] = [];

  get currentCountry() {
    return this.countries[this.cards[0]];
  }

  get countriesFromCards() {
    return this.selectedCountries;
    // return this.cards.map(card => this.countries[card]);
  }

  @Watch('cards')
  onChangeCards() {
    this.selectedCountries = this.cards.map(card => this.countries[card]);
  }

  get nextCard() {
    return this.next;
  }

  randomCountries(n: number) {
    let result = [];
    let taken = this.countries;

    while (n > 0) {
      let randomIndex = Math.floor(Math.random() * taken.length);
      result.push(randomIndex);
      taken.splice(randomIndex, 1);
      n--;
    }
    return result;
  }

  nextCountry() {
    this.next = true;
    this.addNewRandomCountry();
    setTimeout(() => {
      this.next = false;
      this.cards = this.cards.splice(1, 3);
    }, 500);
  }

  addNewRandomCountry() {
    this.cards = this.cards.concat(this.randomCountries(1));
  }

  mounted() {
    this.loading = true;
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        (this.countries = response.data.map((country: any) => country)),
          (this.cards = this.randomCountries(3));
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style>
html,
body {
  max-height: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100%;
}

h1 {
  height: 5vh;
  margin: 2rem 0;
}

.check .material-design-icon > .material-design-icon__svg {
  bottom: 0.125rem !important;
}
</style>
