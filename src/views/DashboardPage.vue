<script setup>

import { ref,onMounted } from 'vue';

const totalEmployees = ref(0)
const totalLeaveRequests = ref(0)

onMounted(async () => {
  try {
    const empRes = await fetch('/employee_info.json')
    const employeesData = await empRes.json()
    totalEmployees.value = employeesData.employeeInformation.length

    const leaveRes = await fetch('/attendance.json')
    const leaveData = await leaveRes.json()
    totalLeaveRequests.value = leaveData.attendanceAndLeave.reduce(
      (acc, emp) => acc + emp.leaveRequests.length,
      0
    )
  } catch (error) {
    console.error('Error fetching JSON:', error)
  }
})
</script>

<template>

<NavBar/>
<h1>Dashboard</h1>
<div class="container text-center">
  <div class="row">
    <div class="col">
      Employees:{{ totalEmployees}}
    </div>
    <div class="col">
      Time off requests:{{ totalLeaveRequests }}
    </div>

  </div>
</div>

<div class="card" style="">
  <div class="card-body">
    <h5 class="card-title">Attendance {{  }}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
<div class="card" style="">
  <div class="card-body">
    <h5 class="card-title">Time-off requests:</h5>
    <p class="card-text">Employee:</p>
    <p class="card-text">Employee:</p>

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
