<template>
  <!-- ADD NAVBAR HERE -->
  <NavBar />
  
  <div class="container">
    <h1>Payroll Records</h1>
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Base Salary</th>
          <th>Bonus</th>
          <th>Deductions</th>
          <th>Total Pay</th>
          <th>Pay Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payroll in payrolls" :key="payroll.payroll_id">
          <td>{{ payroll.employeeId }}</td>
          <td>{{ payroll.baseSalary }}</td>
          <td>{{ payroll.bonus }}</td>
          <td>{{ payroll.deductions }}</td>
          <td>{{ payroll.totalPay }}</td>
          <td>{{ payroll.payDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue'; // ADD THIS IMPORT

const payrolls = ref([]);

const fetchPayroll = async () => {
  try {
    const res = await fetch('http://localhost:2006/payroll');
    if (!res.ok) throw new Error('Failed to fetch payroll');
    payrolls.value = await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

onMounted(fetchPayroll);
</script>

<style scoped>
.container {
  margin-top: 80px; /* Space for fixed navbar */
  padding: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>