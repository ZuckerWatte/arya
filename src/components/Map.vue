<template>
  <div class="hello">
    <p v-if="loading">Loading...</p>
    <h1>{{header}}</h1>
    <p>{{country.name}}</p>
    <img :src="country.flag" :alt="'Flag of ' + country.name"/>
    <button @click="nextRandomCountry" class="btn btn-primary">next!</button>
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
    width: 50%;
}

</style>
