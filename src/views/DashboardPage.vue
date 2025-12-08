<script setup>
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
const totalEmployees = ref(0);
const totalLeaveRequests = ref(0);
const leaveRequesters = ref([]);

onMounted(async () => {
  try {
    const empRes = await fetch("/employee_info.json");
    const employeesData = await empRes.json();
    totalEmployees.value = employeesData.employeeInformation.length;

    const leaveRes = await fetch("/attendance.json");
    const leaveData = await leaveRes.json();
    totalLeaveRequests.value = leaveData.attendanceAndLeave.reduce(
      (acc, emp) => acc + emp.leaveRequests.length,
      0
    );

    leaveRequesters.value = leaveData.attendanceAndLeave
      .filter((emp) => emp.leaveRequests.length > 0)
      .map((emp) => ({
        name: emp.name,
        requests: emp.leaveRequests,
      }));
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
});
</script>

<template>
  <NavBar />
  <h1>Dashboard</h1>
  <div class="container text-center">
    <div class="row">
      <div class="col">Employees:{{ totalEmployees }}</div>
      <div class="col">Time off requests:{{ totalLeaveRequests }}</div>
    </div>
  </div>

  <div class="card" style="">
    <div class="card-body">
      <h5 class="card-title">Time-off requests:</h5>
      <ul>
        <li v-for="emp in leaveRequesters" :key="emp.name">
          <strong>{{ emp.name }}</strong>
          <ul>
            <li v-for="req in emp.requests" :key="req.date">
              {{ req.date }} - {{ req.reason }} ({{ req.status }})
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.container {
  background-color: aliceblue;
  padding: 15px;
  margin: 5% auto;
  
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}
.card {
  
  align-items: center;
  justify-content: center;
  margin: 15px auto;
}
h1 {
  text-align: center;
  margin: 5px;
}
</style>
