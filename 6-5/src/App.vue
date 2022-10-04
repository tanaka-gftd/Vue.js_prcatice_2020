<template>
  <div id = "app">
    <product-list v-bind:products = "products"></product-list>
  </div>
</template>


<script>
import productList from './components/product-list.vue'

export default {
  name: 'app',
  components: {
    'product-list': productList
  },

  data: function() {
    return {
      products: [
            {id: 1, name: 'Michael<br> スマホケース', price: 1580, image: require('./assets/images/01.png'), delv: 0, isSale: true},
            {id: 2, name: 'Raphael<br> スマホケース', price: 1980, image: require('./assets/images/02.png'), delv: 300, isSale: false},
            {id: 3, name: 'Gabriel<br> スマホケース', price: 1450, image: require('./assets/images/03.png'), delv: 240, isSale: true},
            {id: 4, name: 'Uriel<br> スマホケース', price: 1200, image: require('./assets/images/04.png'), delv: 0, isSale: true},
            {id: 5, name: 'Ariel<br> スマホケース', price: 880, image: require('./assets/images/05.png'), delv: 0, isSale: false},
            {id: 6, name: 'Azrael<br> スマホケース', price: 1350, image: require('./assets/images/06.png'), delv: 200, isSale: false},
        ]
    }
  }
}
</script>


<style>
body {
    background: #000;
    color: #fff;
}
</style>
