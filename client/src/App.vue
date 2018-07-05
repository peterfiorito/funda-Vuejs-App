<template>
  <div id="app">
    <div class="container">
      <!-- First show a brief summary of the property -->
      <div class="property-data">
        <h1>{{allData.Adres}}</h1>
        <div class="price"><div v-html="price"></div></div>
      </div>
      <!-- Main content, basically some photos of the property -->
      <div class="main-content">
        <div v-if="allData">
          <img class="picture" v-bind:src="allData.Media[0].MediaItems[3].Url">
        </div>
        <!-- Interior pictures of property -->
        <div class="interior-pictures" v-if="allData">
          <img v-bind:src="allData.Media[2].MediaItems[1].Url">
          <img v-bind:src="allData.Media[3].MediaItems[1].Url">
          <img v-bind:src="allData.Media[4].MediaItems[1].Url">
          <img v-bind:src="allData.Media[5].MediaItems[1].Url">
        </div>
      </div>
      <!-- Show some details-->
      <div class="items-features">
        <h2>Kenmerken</h2>
        <h3>Indeling</h3>
        <ul class="kenmerken">
          <li>AangebodenSindsTekst: <div>{{allData.AangebodenSindsTekst}}</div></li>
          <li>AantalBadkamers: <div>{{allData.AantalBadkamers}}</div></li>
          <li>AantalKamers: <div>{{allData.AantalKamers}}</div></li>
          <li>AantalWoonlagen: <div>{{allData.AantalWoonlagen}}</div></li>
          <li>Aanvaarding: <div>{{allData.Aanvaarding}}</div></li>
          <li>EigendomsSituatie: <div>{{allData.EigendomsSituatie}}</div></li>
        </ul>
      </div>
      <!-- Broker data -->
      <div class="broker-data">
        <h2>NVM verkoopmakelaar</h2>
        <ul class="kenmerken">
          <li>Makelaar: <div>{{allData.Makelaar}}</div></li>
          <li>MakelaarId: <div>{{allData.MakelaarId}}</div></li>
          <li>MakelaarTelefoon: <div>{{allData.MakelaarTelefoon}}</div></li>
        </ul>
      </div>
      <!-- Show all the available small pics -->
      <div class="all-house-pics">
        <div v-for="media in allData['Media-Foto']" v-bind:key="media.id">
            <img v-bind:src="media">
        </div>
      </div>
      <!-- You can click on the link and it will show/hide the whole description -->
      <div class="description">
        <h2>Omschrijving</h2>
        <a v-on:click="showDescription()">{{descButton}}</a>
        <div v-show="toggledDesc"><p>{{allData.VolledigeOmschrijving}}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from './services/PostService'
export default {
  name: 'app',
  data () {
    return {
      allData: '',
      price: '',
      descButton: '+ Show Description',
      toggledDesc: false
    }
  },
  mounted (){
    this.getposts();
  },
  methods: {
    async getposts() {
      //make request to our API via service
      const response = await PostService.fetchPosts();
      this.allData = JSON.parse(response.data[0]);
      this.price = this.allData.Kenmerken[0].Kenmerken[0].Waarde;
    },
    showDescription(){
      //toggle button and button text
      this.toggledDesc = !this.toggledDesc;
      this.descButton === '+ Show Description' ? this.descButton = '- Hide description' : this.descButton = '+ Show Description'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
.container{
  margin: auto;
  padding: 0 0.625;
  background-color: white;
}
h1, h2 {
  font-weight: bold;
	font-size: 2rem;
	margin-bottom: 1.5rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
  cursor: pointer;
  font-size: 1.2em;
}
.main-content{
  margin-top: 1em;
  margin-bottom: 1em;
}
.price{
  font-weight: bold;
  font-size: 1.4em;
}
.picture{
  width: 65em;
  max-width: 100%;
  margin: auto;
}
.interior-pictures{
  max-width: 65em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
}
.kenmerken{
  display: inline-flex;
  flex-direction: column;
  width: 30em;
}
.kenmerken li{
  display: inline-flex;
  justify-content: space-between;
  padding: 0.5em 0 0.5em 0;
  border-bottom: 1px solid lightgray;
}
.broker-data{
  margin-bottom: 2em;
}
.all-house-pics{
  display: inline-flex;
  flex-wrap: wrap;
  max-width: 65em;
}
.description{
  text-align: justify;
  max-width: 65em;
  margin-bottom: 2em;
}
</style>
