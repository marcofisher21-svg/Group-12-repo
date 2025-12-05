<template>
  <div class="modal-backdrop show d-flex justify-content-center align-items-center" style="position:fixed; inset:0; z-index:2000;">
    <div class="card p-3" style="width:520px; max-width:95%;">
      <div class="d-flex justify-content-between">
        <h5>Payslip - {{ payslip.month }}</h5>
        <button class="btn-close" @click="$emit('close')"></button>
      </div>

      <div class="mt-3">
        <p><strong>Employee ID:</strong> {{ payslip.employeeId }}</p>
        <p><strong>Base:</strong> R{{ payslip.base }}</p>
        <p><strong>Tax:</strong> R{{ payslip.tax }}</p>
        <p><strong>Deduction (unpaid days):</strong> ${{ payslip.deduction }}</p>
        <h5>Net: ${{ payslip.net }}</h5>
      </div>

      <div class="mt-3 text-end">
        <button class="btn btn-secondary me-2" @click="download">Download</button>
        <button class="btn btn-primary" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from "vue";
const props = defineProps({ payslip: Object });

function download() {
  const txt = JSON.stringify(toRaw(props.payslip), null, 2);
  const blob = new Blob([txt], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payslip-${props.payslip.employeeId}-${props.payslip.month}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.modal-backdrop { background: rgba(0,0,0,0.4); }
</style>
