<template>
  <div class="navigation">
    <button @click="nextCountry" class="round-button cancel">
      <close-circle-icon />
    </button>
    <button @click="goToCountry" class="round-button check">
      <check-bold-icon />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
  @Prop() public country!: any;

@Emit('nextCountry')
  nextCountry() {
    // this.country = this.countries[
    //   Math.floor(Math.random() * this.countries.length)
    // ];
    // this.mapExpanded = false;
    // this.next = true;
  }

@Emit('toggleMap')
  toggleMap() {
    return !this.mapExpanded;
  }

  goToCountry() {
    window.open("https://en.wikipedia.org/wiki/" + this.country.name, "_blank");
  }
}
</script>

<style lang="scss" scoped>
.navigation {
    height: 20vh;
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
