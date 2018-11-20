<template>
  <div id="app">
    
    <tinymce 
      id="d1"
      v-model="data"
      @keyup="this.keyupHandler"
      @change="this.changeHandler" 
    />
    <button type="button" @click="clickHandler">Reset</button>
   
       
    
  </div>
</template>

<script>
import tinymce from './TinymceVue'

export default {
  name: 'app',
  components: {
    tinymce
  },
  data() {
    return {
      data: '<p>Hello from tinymce</p>'
    }
  },
  mounted() {},
  methods: {
    clickHandler() {
      this.data = "You reseted tinymce's content"
    },
    keyupHandler(value) {
      this.data = value
    },
    changeHandler(value) {
      this.data = value
    }
  }
}
</script>

<style>

</style>
