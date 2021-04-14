<template>
           <ComplaintModal :showModal="true" @close="closeModal()" />
  <router-view />
</template>


<script>
//import DisplayModal from "./components/DisplayModal";
import ComplaintModal from "./components/DisplayModal";

export default {
  name: "App",
  components: {
  
    ComplaintModal
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
}
</script>

<style>
#app {
  @import "./assets/css/volt.css";
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
