<script setup>
import { ref, onMounted, computed } from "vue";
import NavBar from "@/components/NavBar.vue";

const people = ref([]);
const totalEmployees = ref(0);
const totalLeaveRequests = ref(0);
const totalAttendanceRecordings = ref(0);
const showAvailableOnly = ref(false);
const filterStatus = ref('all');
const leaveRequesters = ref([]); 

const filteredAttendance = computed(() => {
  if (filterStatus.value === 'all') {
    return people.value;
  }
  
  if (filterStatus.value === 'present') {
    return people.value.map(emp => ({
      ...emp,
      attendance: emp.attendance ? emp.attendance.filter(rec => 
        String(rec.status).toLowerCase() === 'present'
      ) : []
    })).filter(emp => emp.attendance.length > 0);
  }

  if (filterStatus.value === 'absent') {
    return people.value.map(emp => ({
      ...emp,
      attendance: emp.attendance ? emp.attendance.filter(rec => 
        String(rec.status).toLowerCase() === 'absent'
      ) : []
    })).filter(emp => emp.attendance.length > 0);
  }

  return people.value;
});


onMounted(async () => {
  try {
    const res = await fetch("/attendance.json");
    const data = await res.json();

    const list = data.attendanceAndLeave || [];
    people.value = list;

    totalEmployees.value = list.length;
    totalLeaveRequests.value = list.reduce((sum, p) => sum + (p.leaveRequests?.length || 0), 0);
    totalAttendanceRecordings.value = list.reduce((sum, p) => sum + (p.attendance?.length || 0), 0);

    leaveRequesters.value = list
      .filter(emp => emp.leaveRequests && emp.leaveRequests.length > 0)
      .map(emp => ({
        name: emp.name,
        requests: emp.leaveRequests
      }));

  } catch (err) {
    console.error("Error loading attendance.json:", err);
  }
});

const statusClass = (s) => {
  if (!s) return ''
  const str = String(s).toLowerCase()
  if (str === 'present') return 'status-present'
  if (str === 'absent') return 'status-absent'
  return 'status-other'
}

</script>
<template>
  <NavBar />
  <div class="card-body">

    <h5 class="card-title">Attendance Overview</h5>

    <div class="container text-center mb-3">
      <div class="row">
        <div class="col">Employees: {{ totalEmployees }}</div>
        <div class="col">Attendance Recordings: {{ totalAttendanceRecordings }}</div>
      </div>
    </div>
    <div>
    <div class="filters">
       <button @click="filterStatus = 'absent'" :class="{ active: filterStatus === 'absent' }">
        Absent
      </button>
     <button @click="filterStatus = 'present'" :class="{ active: filterStatus === 'present' }">
        Present
      </button>
      <button @click="filterStatus = 'all'" :class="{ active: filterStatus === 'all' }">
        All
      </button>
     
    </div>

  </div>

    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">Attendance Records</h5>

        <div v-if="people.length === 0" class="text-center">No attendance data found.</div>

        <div v-else>
          <div v-for="emp in filteredAttendance" :key="emp.employeeId" class="mb-4">
            <h6 style="background:#f7f9fb;padding:10px;border-radius:6px;margin:0">
              <strong>{{ emp.name }}</strong> <small class="text-muted">(#{{ emp.employeeId }})</small>
            </h6>

            <div style="overflow-x:auto;margin-top:8px">
              <table class="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="rec in (emp.attendance || [])"
                    :key="emp.employeeId + '-' + rec.date"
                    :class="statusClass(rec.status)"
                  >
                    <td>{{ rec.date }}</td>
                    <td>{{ rec.status }}</td>
                  </tr>
                  <tr v-if="!(emp.attendance && emp.attendance.length)">
                    <td colspan="2" class="text-center">No attendance records for this employee.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>
<style scoped>


.card-body {
  background-color: aliceblue;
 width: 750px;
  align-items: center;
  justify-content: center;
  margin: 5% auto;
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}
h1 {
  text-align: center;
  margin: 5px;
}

.status-present {
  background-color: #d4edda; 
  color: #155724;
}

.status-absent {
  background-color: #f8d7da; 
  color: #721c24;
}

.status-other {
  background-color: #eef2f5; 
  color: #333;
}


.status-present td {
  background-color: #d4edda !important;
  color: #155724 !important;
}
.status-absent td {
  background-color: #f8d7da !important;
  color: #721c24 !important;
}
.status-other td {
  background-color: #eef2f5 !important;
  color: #333 !important;
}

.filters {
  margin-top: 15px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.filters button {
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: white;
  color: #34495e;
  transition: 0.25s ease;
}

.filters button.active {
  background: #1b263b;
  color: white;
}

.filters button:hover {
  transform: translateY(-2px);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
