<template>
  <router-view />
</template>


<script>
export default {
  name: "App",
  components: {},
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
};
</script>

<style>
@import "./assets/css/volt.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media screen and (max-width: 767px) {
  #app {
    margin-top: 0px;
  }

  .content {
    padding: 2rem 1rem 0 1rem;
  }
}
</style>
