<script setup>
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";

const totalLeaveRequests = ref(0);
const totalAttendanceRecordings = ref(0);
const leaveRequesters = ref([]);


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


<div class="container">
  <div class="heading">Leave Application</div>
  <form class="form" action="">

    <div class="input-field">
      <label for="entitlement">Entitlement <span class="required">*</span></label>
      <select id="entitlement" required>
        <option>Select an option</option>
        <option>Annual Leave</option>
        <option>Sick Leave</option>
        <option>Family Responsibility</option>
      </select>
    </div>

 
    <div class="row">
      <div class="input-field">
        <label for="start_date">From </label>
        <input type="date" id="start_date" name="start_date" required>
      </div>
      <div class="input-field">
        <label for="end_date">To <span class="required">*</span></label>
        <input type="date" id="end_date" name="end_date" required>
      </div>
    </div>

    <div class="input-field">
      <label for="session">Session</label>
      <select id="session">
        <option>Full Day</option>
        <option>Half Day (AM)</option>
        <option>Half Day (PM)</option>
      </select>
    </div>


    <div class="input-field">
      <label for="attachment">Attachment</label>
      <input type="file" id="attachment">
    </div>


    <div class="input-field">
      <label for="reason">Reason <span class="required">*</span> </label>
      <textarea id="reason" maxlength="200" required></textarea>
    </div>



    <div class="btn-container">
      <button class="btn">Submit</button>
    </div>
  </form>
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
.card-body {
  background-color: aliceblue;
  width: 500px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin: 2% auto;
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}
h1 {
  text-align: center;
  margin: 5px;
}
form {
  background-color: aliceblue;
  width: 500px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin: 2% auto;
  box-shadow: 0 0 0.8px rgb(0, 0, 0);
  border-radius: 10px;
}


  .container {
  border: solid 1px #8d8d8d;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
}

.container .heading {
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: bolder;
}

.form {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form .btn-container {
  width: 200px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.form .btn {
  padding: 10px 20px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-radius: 10px;
  border: solid 1px #1034aa;
  border-bottom: solid 1px #90c2ff;
  background: linear-gradient(135deg, #0034de, #006eff);
  color: #fff;
  font-weight: bolder;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
    inset 0px -4px 5px #002cbb;
}

.form .btn:active {
  box-shadow: inset 0px 4px 5px #0070f0, inset 0px -4px 5px #002cbb;
  transform: scale(0.995);
}

.input-field {
  position: relative;
}

.input-field label {
  position: absolute;
  color: #8d8d8d;
  pointer-events: none;
  background-color: transparent;
  left: 15px;
  transform: translateY(0.6rem);
  transition: all 0.3s ease;
}

.input-field input {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: solid 1px #8d8d8d;
  letter-spacing: 1px;
  width: 100%;
}

.input-field input:focus,
.input-field input:valid {
  outline: none;
  border: solid 1px #0034de;
}

.input-field input:focus ~ label,
.input-field input:valid ~ label {
  transform: translateY(-51%) translateX(-10px) scale(0.8);
  background-color: #fff;
  padding: 0px 5px;
  color: #0034de;
  font-weight: bold;
  letter-spacing: 1px;
  border: none;
  border-radius: 100px;
}

.form .passicon {
  cursor: pointer;
  font-size: 1.3rem;
  position: absolute;
  top: 6px;
  right: 8px;
}

.form .close {
  display: none;
}

.required {
  color: red;
}

.row {
  display: flex;
  gap: 20px;
}

.row .input-field {
  flex: 1;
}

.input-field select,
.input-field textarea {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: solid 1px #8d8d8d;
  letter-spacing: 1px;
  width: 100%;
  font-family: inherit;
}

.input-field select:focus,
.input-field textarea:focus {
  outline: none;
  border: solid 1px #0034de;
}

.input-field textarea {
  resize: vertical;
  min-height: 100px;
}

.input-field input[type="file"] {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: solid 1px #8d8d8d;
  width: 100%;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.toggle input[type="checkbox"] {
  cursor: pointer;
}
</style>