<template>
  <div class="leaflet-map" :class="{ active: mapExpanded }">
    <button @click="toggleMap" class="long-button">Map</button>
    <div class="map-layer">
      <l-map :zoom="zoom" :center="center" :options="{scrollWheelZoom:false, zoomControl:false}">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="center"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class LeafletMap extends Vue {
  @Prop() zoom!: number;
  @Prop() center!: number[];
  @Prop() mapExpanded: boolean = false;
  

  @Emit('toggleMap')
  toggleMap() {
    return !this.mapExpanded;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leaflet-map {
  height: 100%;
  width: 100%;
  bottom: 19%;
  position: relative;
  transition: bottom 1s ease;
}

button {
  height: 10%;
  background-color:rgb(33, 150, 243);
  color: #fff;
  font-size: 1.2rem;
  width: 100%;
  border: none;
}

.map-layer {
  height: 41%;
}

.active {
  bottom: 60%;
  transition: bottom 0.75s ease;
}
</style>
