<script setup>
import NavBar from '../components/NavBar.vue';
</script>
<template>
  <NavBar />
    <div class="card-body">
      <h5 class="card-title">Attendance {{}}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card’s
        content.
      </p>

    </div>
</template>
<style scoped>
.card-body {
  background-color: aliceblue;
  padding: 15px;
  margin: 5% auto;
  width: 800px;
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}

</style>
