<template>
  <div class="country-card" :class="{animate: isAnimated}">
    <div class="country-content">
      <p>{{country.name}}</p>
      <div class="flag">
        <img :src="country.flag" :alt="'Flag of ' + country.name" />
      </div>
      <LeafletMap
        :zoom="zoom"
        :center="countryLatLng"
        :mapExpanded="mapExpanded"
        @toggleMap="toggleMap"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import LeafletMap from "../components/LeafletMap.vue";

@Component({
  components: {
    LeafletMap
  }
})
export default class CountryCard extends Vue {
  @Prop() private country!: any;
  @Prop() private next!: boolean;

  animated: boolean = false;
  private zoom: number = 5;

  public mapExpanded: boolean = false;

  get isAnimated() {
    return this.animated;
  }

  @Watch("next")
  onChangeNext() {
    this.animated = this.next;
  }

  get countryLatLng() {
    return this.country.latlng;
  }

  toggleMap(e: boolean) {
    this.mapExpanded = e;
    this.zoom = 5;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-size: 1.7rem;
  font-weight: 200;
  margin: 2rem 0;
}

.country-card.animate {
  transition: transform 0.45s;
  transform: translateX(-60rem) rotate(-45deg) !important;
  // transition: opacity 0.5s;
  // opacity: 0 !important;
}

$cardsTotal: 3;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);

.country-card {
  height: 100%;
  max-height: 62vh;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 20px 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 1;
  transform: translateX(0);
  transition: transform 0.3s;

  color: #fff;
  background-image: linear-gradient(-180deg, #ffc6a7 2%, #ff5776 100%);
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .country-card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      background-color: #b6416a;
    } @else if $i == 2 {
      background-color: #e26280;
    }
    @if $i != 1 {
      background-image: none;
    }
  }
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
</style>
