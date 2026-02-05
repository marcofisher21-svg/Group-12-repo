<template>
  <NavBar />
  
  <div class="container">
    <h1>Payroll Records</h1>
    
    <!-- ADD PRINT BUTTON -->
    <div class="mb-3">
      <button @click="printTable" class="btn btn-primary">Print Table</button>
      <button @click="generatePayslip" class="btn btn-success ms-2">Generate PDF</button>
    </div>
    
    <table id="payrollTable">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Base Salary</th>
          <th>Bonus</th>
          <th>Deductions</th>
          <th>Total Pay</th>
          <th>Pay Date</th>
          <th>Actions</th> <!-- ADD ACTION COLUMN -->
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
          <!-- ADD PRINT BUTTON PER ROW -->
          <td>
            <button @click="printPayslip(payroll)" class="btn btn-sm btn-outline-primary">
              Print Payslip
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

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

// SIMPLE PRINT FUNCTION
const printTable = () => {
  window.print();
};

// PRINT INDIVIDUAL PAYSLIP
const printPayslip = (payroll) => {
  // Create a new window with payslip format
  const payslipWindow = window.open('', '_blank');
  
  payslipWindow.document.write(`
    <html>
      <head>
        <title>Payslip - ${payroll.employeeId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .payslip { border: 2px solid #333; padding: 20px; max-width: 600px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; margin: 8px 0; }
          .total { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; }
          button { margin-top: 20px; padding: 10px 20px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="payslip">
          <div class="header">
            <h1>Modern Tech Sulutions</h1>
            <h2>PAYSLIP</h2>
            <p>Pay Date: ${payroll.payDate}</p>
          </div>
          
          <div class="section">
            <h3>Employee Information</h3>
            <div class="row"><span>Employee ID:</span><span>${payroll.employeeId}</span></div>
          </div>
          
          <div class="section">
            <h3>Earnings</h3>
            <div class="row"><span>Base Salary:</span><span>$${payroll.baseSalary}</span></div>
            <div class="row"><span>Bonus:</span><span>$${payroll.bonus}</span></div>
          </div>
          
          <div class="section">
            <h3>Deductions</h3>
            <div class="row"><span>Total Deductions:</span><span>$${payroll.deductions}</span></div>
          </div>
          
          <div class="section total">
            <div class="row"><span>NET PAY:</span><span>$${payroll.totalPay}</span></div>
          </div>
          
          <button onclick="window.print()">Print Payslip</button>
        </div>
      </body>
    </html>
  `);
  
  payslipWindow.document.close();
};

onMounted(fetchPayroll);
</script>

<style scoped>
.container {
  margin-top: 80px;
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

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-outline-primary {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
}

.ms-2 {
  margin-left: 8px;
}

.mb-3 {
  margin-bottom: 16px;
}

@media print {
  .container { margin-top: 0; }
  .btn { display: none; }
  #payrollTable { width: 100%; }
}
</style>