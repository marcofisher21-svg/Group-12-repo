<template>
  <NavBar />

  <div class="container py-4">
    <h3>Payroll</h3>

    <div class="row mt-3">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Base</th>
              <th>Tax</th>
              <th>Deduction</th>
              <th>Net</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="e in employeesList" :key="e.employeeId">
              <td>{{ e.name }}</td>
              <td>{{ e.department }}</td>
              <td>{{ formatCurrency(e.finalSalary) }}</td>
              <td>{{ formatCurrency(computeResult[e.employeeId]?.tax) }}</td>
              <td>{{ formatCurrency(computeResult[e.employeeId]?.deduction) }}</td>
              <td>{{ formatCurrency(computeResult[e.employeeId]?.net) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" @click="selectedEmployee = e">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Inline modal -->
    <div v-if="selectedEmployee" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payslip - {{ selectedEmployee.name }}</h5>
            <button type="button" class="btn-close" @click="selectedEmployee = null"></button>
          </div>

          <div class="modal-body">
            <p><strong>Department:</strong> {{ selectedEmployee.department }}</p>
            <p><strong>Base:</strong> {{ formatCurrency(selectedEmployee.finalSalary) }}</p>
            <p><strong>Tax:</strong> {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.tax) }}</p>
            <p><strong>Deduction:</strong> {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.deduction) }}</p>
            <p><strong>Net:</strong> {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.net) }}</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="selectedEmployee = null">Close</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="selectedEmployee = null"></div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { ref, onMounted } from "vue";

const employeesList = ref([]);
const computeResult = ref({});
const selectedEmployee = ref(null);

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount || 0);
}

function computePayslip(employee) {
  const gross = Number(employee.finalSalary || 0);
  const tax = Math.round(gross * 0.1);
  const deduction = (employee.leaveDeductions || 0) * 100;
  const net = gross - tax - deduction;
  return { tax, deduction, net, gross };
}

function computeAsync(employee) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(computePayslip(employee));
    }, 150);
  });
}

onMounted(async () => {
  try {
    // Load payroll data
    const resPayroll = await fetch('/payroll_data.json');
    const payrollJson = await resPayroll.json();
    const payrollData = payrollJson.payrollData || [];

    // Load employee info data
    const resInfo = await fetch('/employee_info.json');
    const infoJson = await resInfo.json();
    const employeeInfo = infoJson.employeeInformation || []; // <-- updated field name

    // Merge info into payroll data
    employeesList.value = payrollData.map(emp => {
      const info = employeeInfo.find(i => Number(i.employeeId) === Number(emp.employeeId));
      return {
        ...emp,
        name: info?.name || 'Unknown',
        department: info?.department || 'N/A'
      };
    });

    // Compute payslips
    for (const emp of employeesList.value) {
      computeResult.value[emp.employeeId] = await computeAsync(emp);
    }

  } catch (err) {
    console.error('Failed to load payroll or employee info:', err);
  }
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 1040;
}
.modal-dialog {
  z-index: 1050;
  margin-top: 10vh;
}
</style>
