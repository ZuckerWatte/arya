<template>
  <div class="cards">
    <CountryCard
      v-for="(card, index) in cards"
      :key="card.name"
      :country="card"
      :index="index"
      :next="index !== 0 ? false : isAnimated"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import CountryCard from "../components/CountryCard.vue";

@Component({
  components: {
    CountryCard
  }
})
export default class CardStack extends Vue {
  @Prop() cards!: [];
  @Prop() next!: boolean;
  animated:boolean = false;

//   get nextCard() {
//     return this.next;
//   }

get isAnimated() {
    return this.animated;
}

  @Watch('next')
onChangeNext() {
    this.animated = this.next;
}
}
</script>

<style scoped>
.cards {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
}
</style>