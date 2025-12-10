
<script setup>
import { ref, onMounted } from 'vue'
import NavBar from "@/components/NavBar.vue";

// ADD THIS FUNCTION HERE
const getImage = (fileName) => {
  return new URL(`../assets/employees/${fileName}`, import.meta.url).href
}

const employees = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/employee_info.json')
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    employees.value = data.employeeInformation
  } catch (err) {
    console.error('Failed to load employees', err)
  }
})

</script>
<template>
  <NavBar />
  
  <div class="container">
    <h5 class="page-title">Employee Information</h5>
    <div class="employees-row">
      <div v-for="employee in employees" :key="employee.employeeId" class="employee-card">
       <img :src="getImage(employee.image)" class="card-img-top" alt="employee photo">
        <div class="card-body">
          <p class="name"><strong>{{ employee.name }}</strong></p>
          <p class="position"><strong>Position:</strong> {{ employee.position }}</p>
          <p class="department"><strong>Department:</strong> {{ employee.department }}</p>
          <p class="salary"><strong>Salary:</strong> R {{ employee.salary }}</p>
          <p class="employmentHistory"><strong>History:</strong> {{ employee.employmentHistory }}</p>
          <p class="contact"><strong>Contact:</strong> {{ employee.contact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.container {
  padding: 20px;
  max-width: 100%;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #333;
}

.employees-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  align-items: flex-start;
}

.employee-card {
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  height: 220px;           /* Good portrait height */
  object-fit: cover;       /* No stretching */
  object-position: top;    /* Keep the face visible */
}

.card-body {
  background-color: #f8f9fa;
  padding: 15px;
  display: block;
}

.name {
  font-size: 1.1rem;
  margin: 8px 0;
  color: #222;
}

.position, .department, .salary, .employmentHistory, .contact {
  font-size: 0.85rem;
  margin: 6px 0;
  color: #555;
}

</style>