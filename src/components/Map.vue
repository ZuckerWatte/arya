<template>
  <div class="map">
    <h1>{{header}}</h1>
    <p v-if="loading">Loading...</p>
    <div v-else class="country-content">
      <p>{{country.name}}</p>
      <div class="flag">
        <img :src="country.flag" :alt="'Flag of ' + country.name" />
      </div>
      <LeafletMap :zoom="zoom" :center="countryLatLng" :mapExpanded="mapExpanded" @toggleMap="toggleMap" />
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
import LeafletMap from "../components/LeafletMap.vue";
import axios from "axios";

@Component({
  components: {
    LeafletMap
  }
})
export default class Map extends Vue {
  private zoom: number = 5;

  public loading: boolean = false;
  public mapExpanded: boolean = false;
  public country: any = {};
  header = "Let's go to ... ";
  countries: [] = [];

  get countryLatLng() {
    return this.country.latlng;
  }

  get randomCountry() {
    return this.countries[Math.floor(Math.random() * this.countries.length)];
  }

  toggleMap(e: boolean) {
    this.mapExpanded = e;
    this.zoom = 5;
  }

  nextRandomCountry() {
    this.country = this.countries[
      Math.floor(Math.random() * this.countries.length)
    ];
    this.mapExpanded = false;
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
h1 {
  font-size: 1.7rem;
  font-weight: 200;
  margin: 2rem 0;
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
.map {
  height: 100%;
}

.country-content {
  height: 65%;
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
  background-image: linear-gradient(
    -180deg,
    #f1f8ff 2%,
    #dbe9f5 25%
  );
  border-radius: 15px;
  box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);
  padding-bottom: 6%;
}

.country-content > p {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1rem 0;
}

.country-content > .flag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
}

.country-content > .flag > img {
  height: auto;
  width: 100%;
  max-height: 100%;
}

.navigation {
  display: block;
  height: 35%;
  margin-top: 3rem;
}

.round-button {
  border: none;
  display: inline-block;
  margin: 2rem;
  padding: 0;
  height: auto;
}

.round-button:hover span {
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

.cancel:hover span {
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
