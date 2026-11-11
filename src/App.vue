<script setup>
import { ref, watch } from "vue";

const applications = ref(
  JSON.parse(localStorage.getItem("applications")) || [],
);
const company = ref("");
const role = ref("");
const status = ref("Applied");
function addApplication() {
  if (!company.value || !role.value) {
    alert("Please fill in both company and role fields!");
    return;
  }
  applications.value.push({
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    company: company.value,
    role: role.value,
    status: status.value,
  });
  company.value = "";
  role.value = "";
}
watch(
  applications,
  (newApplications) => {
    localStorage.setItem("applications", JSON.stringify(newApplications));
  },
  { deep: true },
);
function delApplication(id) {
  applications.value = applications.value.filter((app) => app.id !== id);
}
</script>

<template>
  <div class="drag-bar"></div>
  <h1>My job tracker</h1>
  <ul>
    <li v-for="app in applications" :key="app.id">
      <div class="application-info">
        <span>{{ app.company }} - {{ app.role }}</span>

        <span class="application-date">{{ app.date }}</span>
      </div>
      <!-- taking 2 classes, general status css and each status css, so that the
      status can be styled differently based on its value (pending, applied, interview, offer, rejected)-->
      <span :class="['status', app.status.toLowerCase()]">{{
        app.status
      }}</span>
      <!-- ------------------ -->
      <button @click="delApplication(app.id)">Delete</button>
    </li>
  </ul>
  <input v-model="company" placeholder="Company" />
  <!-- <p>You typed: {{ company }}</p> -->
  <input v-model="role" placeholder="Role" />
  <!--_____________________________________________-->
  <!-- <  <p>You typed: {{ role }}</p>> -->
  <select v-model="status">
    <option>Applied</option>
    <option>Interview</option>
    <option>Offer</option>
    <option>Rejected</option>
  </select>
  <button @click="addApplication">Add Application</button>
  <!--_____________________________________________-->
</template>
