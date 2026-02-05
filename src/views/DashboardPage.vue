<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

const totalEmployees = ref(0)

const fetchTotalEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:2006/employee/total')
    totalEmployees.value = response.data.total
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchTotalEmployees()
})
</script>

<template>
  <NavBar />

  <div class="containerBox d-flex justify-content-center gap-5">
    <div class="sideBoxes">
      <!-- Employees Card (ACTIVE) -->
      <div class="card mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Employees</h5>
          <p class="card-text">Total: {{ totalEmployees }}</p>
          <RouterLink to="/employee" class="btn btn-primary">Go</RouterLink>
        </div>
      </div>

      <!--
      <div class="card text-center mb-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Leave requests</h5>
          <p class="card-text">Requests: {{ totalLeaveRequests }}</p>
          <RouterLink to="/leave" class="btn btn-primary">Go</RouterLink>
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
      -->

    </div>

    <!--
    <div id="calendarWrapper" class="calendar-wrapper w-50">
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

        <button class="carousel-control-prev" type="button" data-bs-target="#calendarCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#calendarCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
    -->
  </div>
</template>

<style scoped>
/* Keep your existing styles as is */
.containerBox {
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding-left: 12px;
  padding-right: 12px;
  max-width: 1200px;
  margin: 5% auto;
}

.sideBoxes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
