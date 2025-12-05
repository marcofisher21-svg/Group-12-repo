<script setup>
import NavBar from '../components/NavBar.vue';

</script>

<template>

<NavBar/>
<h1>Dashboard</h1>
<div class="container text-center">
  <div class="row">
    <div class="col">
      Employees:
    </div>
    <div class="col">
      Time off requests:
    </div>

  </div>
</div>

<div class="card" style="">
  <div class="card-body">
    <h5 class="card-title">Attendance</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
<div class="card" style="">
  <div class="card-body">
    <h5 class="card-title">Role</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
</template>
<style scoped>
.container{
  background-color: aliceblue;
  padding: 15px;
  margin: 5% auto;
  width: 800px;
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}
.card{
  width: 800px;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
}
h1{
  text-align: center;
  margin: 5px;
}
</style>
