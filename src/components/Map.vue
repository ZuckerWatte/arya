<template>
  <div class="hello">
    <h1>{{header}}</h1>
    <input type="text" placeholder="add something" v-model="newItem" @keyup.enter="addToList" />
    <span>{{characterCount}}/200</span>
    <button :value="list" @click="addToList" class="btn btn-primary">click!</button>
    <p v-if="list.length === 0">Nothing to show here!</p>
    <ul>
      <li
        v-for="item in reverseList"
        v-bind:key="item.label"
        :class="{done: item.done}"
        @click="checkItem(item)"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Map extends Vue {
  public newItem: string = "";
  header = "ready!";
  json:string = "";
  list: any = [];

  get characterCount() {
    return this.newItem.length;
  }

  get reverseList() {
    return this.list.slice(0).reverse();
  }

  addToList() {
    if (this.newItem != "") {
      this.list.push({ label: this.newItem, done: false });
      this.newItem = "";
    }
  }

  checkItem(item: any) {
    item.done = !item.done;
  }

  mounted() {
    const userAction = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      this.json = myJson;
      console.log(this.json);
    };
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

.done {
  color: lightgrey;
  text-decoration: line-through;
}

a {
  color: #42b983;
}
</style>
