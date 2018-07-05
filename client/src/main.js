//import Vue and our main component
import Vue from 'vue'
import App from './App.vue'

//generate the component in our app element id in html
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})
