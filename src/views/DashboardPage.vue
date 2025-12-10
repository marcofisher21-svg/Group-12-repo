<script setup>
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";

const totalEmployees = ref(0);
const totalLeaveRequests = ref(0);
const leaveRequesters = ref([]);

const performanceList = ref([]);

const allCalendars = ref([]);

function isToday(day) {
  const today = new Date();
  return day.date.toDateString() === today.toDateString();
}


function generateCalendar(month, year) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    const iso = date.toISOString().slice(0, 10);

    const leavesOnDay = leaveRequesters.value
      .flatMap(emp =>
        emp.requests
          .filter(req => req.date === iso)
          .map(req => ({
            name: emp.name,
            reason: req.reason,
            status: req.status
          }))
      );

    days.push({
      date: new Date(date),
      leaves: leavesOnDay
    });

    date.setDate(date.getDate() + 1);
  }

  return days;
}


function generateAllCalendars() {
  const calendars = [];
  let year = 2024;
  let month = 11; 

  for (let i = 0; i < 13; i++) {
    calendars.push({
      month,
      year,
      title: new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric"
      }),
      days: generateCalendar(month, year)
    });

    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  allCalendars.value = calendars;
}


onMounted(async () => {
  try {
    const empRes = await fetch('/employee_info.json');
    const employeesData = await empRes.json();
    totalEmployees.value = employeesData.employeeInformation.length;

    const leaveRes = await fetch('/attendance.json');
    const leaveData = await leaveRes.json();

    totalLeaveRequests.value = leaveData.attendanceAndLeave.reduce(
      (acc, emp) => acc + emp.leaveRequests.length,
      0
    );

    leaveRequesters.value = leaveData.attendanceAndLeave
      .filter(emp => emp.leaveRequests.length > 0)
      .map(emp => ({
        name: emp.name,
        requests: emp.leaveRequests
      }));

    // Build performance list: attendance rate and leave count per employee
    const perf = leaveData.attendanceAndLeave.map(emp => {
      const total = (emp.attendance || []).length || 0;
      const present = (emp.attendance || []).filter(r => String(r.status).toLowerCase() === 'present').length;
      const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
      const leaveCount = (emp.leaveRequests || []).length;
      return {
        employeeId: emp.employeeId,
        name: emp.name,
        attendanceRate,
        leaveCount
      };
    });

    // Join with employee info to ensure names/positions are accurate
    performanceList.value = perf.map(p => {
      const info = employeesData.employeeInformation.find(e => Number(e.employeeId) === Number(p.employeeId));
      return {
        ...p,
        position: info?.position || '',
      };
    }).sort((a,b) => b.attendanceRate - a.attendanceRate);

    
    generateAllCalendars();

  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
});
</script>

<template>
  <NavBar />

  
  <div class="containerBox d-flex justify-content-center gap-5">
    <div class="sideBoxes">
      <div class="card mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Employees</h5>
          <p class="card-text">Total: {{ totalEmployees }}</p>
          <RouterLink to="/employee" class="btn btn-primary">Go</RouterLink>
        </div>
      </div>

      <div class="card text-center mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Leave requests</h5>
          <p class="card-text">Requests: {{ totalLeaveRequests }}</p>
          <a href="#" class="btn btn-primary">Go</a>
        </div>
      </div>

      <div class="card mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Performance Overview</h5>
          <p class="card-text">Top attendance</p>
          <ul class="perf-list list-unstyled mb-0">
            <li v-for="p in performanceList.slice(0,5)" :key="p.employeeId" class="perf-item">
              <div class="perf-row">
                <div class="perf-name">{{ p.name }}</div>
                <div class="perf-rate">{{ p.attendanceRate }}%</div>
              </div>
              <div class="perf-bar">
                <div class="perf-fill" :style="{ width: p.attendanceRate + '%' }"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>

     
    </div>
    
    
    <div  id="calendarWrapper" class="calendar-wrapper w-50 ">
      <div id="calendarCarousel" class="carousel slide">
        <div class="carousel-inner">
          
          <div
          v-for="(month, index) in allCalendars"
          :key="month.title"
          class="carousel-item"
          :class="{ active: index === 0 }"
          >
          
          <h3 class="text-center">{{ month.title }}</h3>
          
          <ul class="calendar-grid">
            <li v-for="day in month.days" :key="day.date">
              <time :class="{ today: isToday(day) }">
                {{ day.date.getDate() }}
              </time>
              
              <ul v-if="day.leaves.length">
                <li v-for="leave in day.leaves" :key="leave.name">
                  <span>{{ leave.name }} - {{ leave.reason }}</span>
                </li>
              </ul>
            </li>
          </ul>
          
        </div>
      </div>
      
      <!-- controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#calendarCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#calendarCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>


.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  list-style: none;
  padding: 0;
}

.calendar-grid li {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 4px;
  min-height: 70px;
  font-size: 0.7rem;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
}

.calendar-grid time {
  font-weight: bold;
  font-size: 1rem;
}

.today {
  color: red;
}
.containerBox{
  margin-top: 5%;
}
.containerBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding-left: 12px;
  padding-right: 12px;
  max-width: 1200px;
  margin: 5% auto;
}

/* Side boxes layout */
.sideBoxes{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .containerBox {
   flex-direction: column;
   gap: 1rem;
   padding-left: 10px;
   padding-right: 10px;
  }
  #calendarWrapper {
    width: 100% !important;
    margin:0;
  }
  .calendar-grid{
    grid-template-columns: repeat(3, 1fr);
  }
  .perf-name { max-width: 140px; }
}

@media screen and (max-width: 480px) {
  .calendar-grid{ grid-template-columns: repeat(2, 1fr); }
  .calendar-grid li { min-height: 56px; font-size: 0.65rem; padding: 6px; }
  .calendar-grid time { font-size: 0.9rem; }
  .perf-name { font-size: 0.85rem; max-width: 120px; }
  .perf-rate { font-size: 0.8rem; }
  .perf-bar { height:6px; }
  .perf-fill { height:100%; }
  .sideBoxes .card { width: 100% !important; }
  .containerBox { margin-top: 6%; }
}
.perf-list .perf-item { margin-bottom: 10px; }
.perf-row { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.perf-name { font-size: 0.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.perf-rate { font-weight:700; font-size:0.85rem; }
.perf-bar { background:#e9ecef; height:8px; border-radius:6px; overflow:hidden; margin-top:6px; }
.perf-fill { background: linear-gradient(90deg,#4caf50,#2e7d32); height:100%; }

@media screen and (max-width: 768px) {
  /* make side cards stack and shrink on small screens */
  .sideBoxes .card { width: 100% !important; }
}
</style>
