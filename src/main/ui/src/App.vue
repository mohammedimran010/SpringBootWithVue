<template>
  <div id="app">
    <Header />
    <Loader :isLoading="app.isLoading"/>
    <Error :hasError="app.hasError" />
    <Home/>
  </div>
</template>

<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '@/components/Header/Header.vue';
import Loader from '@/components/Loader/Loader.vue';
import Error from '@/components/Error/Error';
import Home from '@/components/Home/Home.vue';

export default {
  name: 'App',
  components: {
    Header,
    Loader,
    Error,
    Home
  },
  data: () => ({
    app: {
      isLoading:false,
      hasError: false
    }
  }),
  provide () {
    return {
      app: this.app
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
