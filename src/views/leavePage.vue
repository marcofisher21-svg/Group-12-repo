<script setup>
import { ref, onMounted, computed } from "vue";
import NavBar from "@/components/NavBar.vue";

const totalLeaveRequests = ref(0);
const totalAttendanceRecordings = ref(0);
const leaveRequesters = ref([]);
const newLeaveRequests = ref([]);

const combinedLeaveRequesters = computed(() => {
  return [...leaveRequesters.value, ...newLeaveRequests.value];
});

onMounted(async () => {
  try {
    const leaveRes = await fetch('/attendance.json');
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

    const saved = localStorage.getItem('newLeaveRequests');
    if (saved) {
      newLeaveRequests.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
});


</script>

<template>
    <NavBar />
<div class="card-body">

    <h5 class="card-title">Time Off Overview</h5>

    <div class="container text-center mb-3">
      <div class="row">
        <div class="col">Total Requests: {{ totalLeaveRequests }}</div>
      </div>
    </div>
</div>


 <div class="card" style="">
    <div class="card-body">
      <h5 class="card-title">Time-off requests:</h5>
      <ul>
        <li v-for="emp in combinedLeaveRequesters" :key="emp.name">
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
:root {
  --card-bg: #f5fbff;
  --accent: #0034de;
  --muted: #8d8d8d;
  --radius: 10px;
}

.page-card,
.card-body {
  background: var(--card-bg);
  max-width: 760px;
  margin: 24px auto;
  padding: 20px 24px;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(3, 20, 80, 0.06);
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 1.15rem;
  color: #0b234b;
}

.container {
  max-width: 760px;
  margin: 12px auto;
  padding: 18px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  background: #fff;
}

.container .heading {
  font-size: 1.25rem;
  margin-bottom: 14px;
  font-weight: 700;
  color: #0b234b;
}


.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.row .input-field {
  flex: 1 1 220px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-field label {
  font-size: 0.92rem;
  color: var(--muted);
  margin-left: 4px;
  font-weight: 500;
}

.input-field input,
.input-field select,
.input-field textarea,
.input-field input[type="file"] {
  padding: 12px 14px;
  font-size: 0.98rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  color: #082344;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field textarea {
  min-height: 100px;
  resize: vertical;
}

.input-field input:focus,
.input-field select:focus,
.input-field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 52, 222, 0.06);
}

.required { color: #d04545; }

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.btn {
  padding: 12px 32px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #0034de, #0a63ff);
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 52, 222, 0.2);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 52, 222, 0.3);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 52, 222, 0.2);
}

.toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
}


.card .card-body {
  background: transparent;
  padding: 0;
  box-shadow: none;
}

ul { padding-left: 18px; }


@media (max-width: 640px) {
  .row { flex-direction: column; }
  .page-card,
  .container { margin: 12px; padding: 16px; }
  .btn-container { justify-content: center; margin-top: 20px; }
}
</style>