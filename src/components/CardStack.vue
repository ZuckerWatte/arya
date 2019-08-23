<template>
  <div class="cards">
    <CountryCard
      v-for="(card, index) in cards"
      :key="card.name"
      :country="card"
      :next="index === 0 ? nextCard : false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import CountryCard from "../components/CountryCard.vue";

@Component({
  components: {
    CountryCard
  }
})
export default class CardStack extends Vue {
  @Prop() cards!: [];
  @Prop() next!: boolean;

  get nextCard() {
    return this.next;
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