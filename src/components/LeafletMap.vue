<template>
  <div class="leaflet-map" :class="{ active: mapExpanded }">
    <button @click="toggleMap" class="long-button">Map</button>
    <div class="map-layer">
      <l-map style="min-height: 50vh; min-width: 80vw" :zoom="zoom" :center="center" :options="{scrollWheelZoom:false, zoomControl:false}">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="center" :icon="defaultIcon"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import * as L from 'leaflet';

@Component
export default class LeafletMap extends Vue {
  @Prop() zoom!: number;
  @Prop() center!: number[];
  @Prop() mapExpanded: boolean = false;
  
  get defaultIcon() { return L.icon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
        shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      })}

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
  bottom: 10%;
  position: relative;
  transition: bottom 1s ease;
}

button {
  height: 15%;
  background-color:#2292ee;
  color: #fff;
  font-size: 1.2rem;
  width: 100%;
  border: none;
}

.map-layer {
  height: 80%;
  width: 100%;
}

.active {
  bottom: 80%;
  transition: bottom 0.75s ease;
}
</style>
