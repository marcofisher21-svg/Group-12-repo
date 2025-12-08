
<script setup>
import { ref, onMounted } from 'vue'
import NavBar from "@/components/NavBar.vue";

const employees = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/employee_info.json')
    if (!res.ok) throw new Error(res.statusText)
    employees.value = await res.json()
  } catch (err) {
    console.error('Failed to load employees', err)
  }
})

</script>
<template>
  <NavBar />

  <div v-for="employee in employees" :key="employee.employeeId" class="card" style="width: 18rem;">
    <img src="https://imgs.search.brave.com/c-iHTuBHs88C0IRkAJNGjCGzMDQyPl45bVol3d3ngDg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBmLzEz/LzE5LzBmMTMxOTc5/NzkyYmNhMzdjMzQz/N2NjN2QxOGYzYzMy/LmpwZw" class="card-img-top" alt="employee photo">
    <div class="card-body">
      <p class="name">{{ employee.name }}</p>
      <p class="position">{{ employee.position }}</p>
      <p class="department">{{ employee.department }}</p>
      <p class="salary">{{ employee.salary }}</p>
      <p class="employmentHistory">{{ employee.employmentHistory }}</p>
      <p class="contact">{{ employee.contact }}</p>
    </div>
  </div>

</template>
<style>



</style>