<template>
  <div>
    <NavBar />
    <div class="container py-4">
      <h3>Payroll</h3>
      <div class="row mt-3">
        <div class="col-md-8">
          <table class="table table-striped">
            <thead>
              <tr><th>Name</th>
                <th>Base</th>
                <th>Tax</th>
                  <th>Deduction</th>
                    <th>Net</th>
                      <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in employeesList" :key="e.id">
                <td>{{ e.name }}</td>
                  <td>$ {{ e.salaryMonthly }}</td>
                    <td>$ {{ compute(e).tax }}</td>
                      <td>$ {{ compute(e).deduction }}</td>
                <td>$ {{ compute(e).net }}</td>
                <td><button class="btn btn-sm btn-outline-primary" @click="openPayslip(e)">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <PayslipModal v-if="payslip" :payslip="payslip" @close="payslip=null" />
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import PayslipModal from "./pay-slip-modal.vue";

import { employees, computePayslip } from "../data/payroll.js"; // ✅ FIXED
import { ref } from "vue";

const employeesList = employees;
const payslip = ref(null);

function compute(e) {
  return computePayslip(e, new Date().toISOString().slice(0, 7));
}

function openPayslip(e) {
  payslip.value = computePayslip(e, new Date().toISOString().slice(0, 7));
}
</script>
