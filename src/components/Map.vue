<template>
  <div class="map">
    <div class="country-content">
      <p v-if="loading">Loading...</p>
      <h1>{{header}}</h1>
      <p>{{country.name}}</p>
      <img :src="country.flag" :alt="'Flag of ' + country.name" />
    </div>
    <div class="navigation">
      <button @click="nextRandomCountry" class="round-button cancel">
        <close-circle-icon />
      </button>
      <button class="round-button check">
        <check-bold-icon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Map extends Vue {
  public loading: boolean = false;
  public country: string = "";
  header = "Let's go to ... ";
  countries: [] = [];

  get randomCountry() {
    return this.countries[Math.floor(Math.random() * this.countries.length)];
  }

  nextRandomCountry() {
    this.country = this.countries[
      Math.floor(Math.random() * this.countries.length)
    ];
  }

  mounted() {
    this.loading = true;
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(
        response =>
          (this.countries = response.data.map((country: any) => country))
      )
      .catch(error => console.log(error))
      .finally(() => {
        (this.loading = false), (this.country = this.randomCountry);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  display: block;
  margin: 0 auto;
}

img {
  height: auto;
  height: 75%;
}

.map {
  height: 100%;
}

.country-content {
  display: block;
  height: 75%;
  overflow: hidden;
}

.navigation {
  display: block;
  height: 25%;
}

.round-button {
  border: none;
  display: inline-block;
  margin: 2rem;
  padding: 0;
  height: auto;
}

.round-button:hover span{
  cursor: pointer;
  transform: scale(1.5);
  transition-duration: 0.35s;
  transition-property: color, border, transform;
}

.round-button span {
  width: 3rem;
  height: 3rem;
  border: 2px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  transform: scale(1.4);
  transition-duration: 0.2s;
  transition-property: color, border, transform;
}

.cancel span {
  font-size: 4rem;
  border-color: #f44336;
  color: #f44336;
}

.cancel:hover span{ 
  border-color: #f44336cb;
  color: #f44336cb;
}

.check span {
  font-size: 2.5rem;
  border-color: #4caf50;
  color: #fff;
  background-color: #4caf50;
}

.check:hover span {
  border-color: #4caf4fd6;
  color: #fff;
  background-color: #4caf4fd6;
}

</style>
