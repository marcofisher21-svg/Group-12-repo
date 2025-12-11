<template>
  <NavBar />

  <div class="container py-4">
    <h3>Payroll</h3>

    <div class="innerCard tableDiv">
      <div class="row mt-3">
        <div class="col-12">
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
    </div>

    <div v-if="selectedEmployee" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" id="print-area">
          <div class="modal-header">
            <h5 class="modal-title">Payslip - {{ selectedEmployee.name }}</h5>
            <button type="button" class="btn-close" @click="selectedEmployee = null"></button>
          </div>

          <div class="modal-body">
            <p><strong>Department:</strong> {{ selectedEmployee.department }}</p>
            <p><strong>Hours Worked:</strong> {{ selectedEmployee.hoursWorked || 'N/A' }}</p>
            <p><strong>Leave Days:</strong> {{ selectedEmployee.leaveDeductions || 0 }}</p>

            <hr />

            <p><strong>Gross Salary:</strong> {{ formatCurrency(selectedEmployee.finalSalary) }}</p>
            <p><strong>Tax (10%):</strong> {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.tax) }}</p>
            <p><strong>Deductions:</strong> {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.deduction) }}</p>

            <hr />

            <p><strong>Net Salary:</strong>
              <span style="font-size: 1.1rem; font-weight: bold;">
                {{ formatCurrency(computeResult[selectedEmployee.employeeId]?.net) }}
              </span>
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary" @click="printPayslip">Print PDF</button>
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

function printPayslip() {
  window.print();
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
  
    const resPayroll = await fetch('/payroll_data.json');
    const payrollJson = await resPayroll.json();
    const payrollData = payrollJson.payrollData || [];

   
    const resInfo = await fetch('/employee_info.json');
    const infoJson = await resInfo.json();
    const employeeInfo = infoJson.employeeInformation || []; 

    
    employeesList.value = payrollData.map(emp => {
      const info = employeeInfo.find(i => Number(i.employeeId) === Number(emp.employeeId));
      return {
        ...emp,
        name: info?.name || 'Unknown',
        department: info?.department || 'N/A'
      };
    });

    
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
@media screen and (max-width: 600px) {
  .container {
    padding: 0%;
    margin: 0%;
  }
 #innerCard {
    width: 50%;
    
  }
  
  .table th:nth-child(4), .table td:nth-child(4),
  .table th:nth-child(5), .table td:nth-child(5)   {
    display: none;
  }

  .table {
    table-layout: fixed;
    font-size: 13px;
  }

  .table th, .table td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.4rem 0.35rem;
  }


  .table td:last-child {
    width: 72px;
  }


  .tableDiv {
    overflow-x: auto;
  }
}

@media screen and (max-width: 600px) {
  .innerCard { padding: 8px 6px; }
  .table { font-size: 13px; }
  th, td { padding: 0.4rem 0.25rem; }
}
</style>
