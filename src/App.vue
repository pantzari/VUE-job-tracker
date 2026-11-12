<script setup>
import { ref, watch } from "vue";

const applications = ref(
  JSON.parse(localStorage.getItem("applications")) || [],
);

const company = ref("");
const role = ref("");
const status = ref("Applied");
const link = ref("");

// Today's date
const today = new Date().toISOString().split("T")[0];
const date = ref(today);

// Add a new application
function addApplication() {
  if (!company.value || !role.value) {
    alert("Please fill in both company and role fields!");
    return;
  }

  const formattedDate = date.value
    ? new Date(date.value).toLocaleDateString()
    : new Date().toLocaleDateString();

  applications.value.push({
    id: Date.now(),
    date: formattedDate,
    statusDate: null, // start as null so the second date stays hidden until updated
    company: company.value,
    role: role.value,
    status: status.value,
    link: link.value.trim(),
  });

  company.value = "";
  role.value = "";
  link.value = "";
  date.value = new Date().toISOString().split("T")[0];
}

// Update application status and status date
function updateStatus(app, newStatus) {
  if (app.status !== newStatus) {
    app.status = newStatus;
    app.statusDate = new Date().toLocaleDateString();
  }
}

// Save applications to LocalStorage
watch(
  applications,
  (newApplications) => {
    localStorage.setItem("applications", JSON.stringify(newApplications));
  },
  { deep: true },
);

// Delete application
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
        <!-- Company and role link -->
        <a
          v-if="app.link"
          :href="app.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ app.company }} - {{ app.role }}
        </a>
        <span v-else>{{ app.company }} - {{ app.role }}</span>

        <!-- Dates side-by-side -->
        <div class="date-wrapper">
          <span class="application-date">{{ app.date }}</span>
          <span v-if="app.statusDate" class="status-date">
            (Updated: {{ app.statusDate }})
          </span>
        </div>
      </div>

      <!-- Editable status -->
      <select
        :value="app.status"
        :class="['status', app.status.toLowerCase()]"
        @change="updateStatus(app, $event.target.value)"
      >
        <option>Applied</option>
        <option>Reminded</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button @click="delApplication(app.id)">Delete</button>
    </li>
  </ul>

  <!-- New application form -->
  <input v-model="company" placeholder="Company" />

  <input v-model="role" placeholder="Role" />
  <div class="wrapper">
    <input type="date" v-model="date" />

    <input v-model="link" type="url" placeholder="Job posting URL" />
  </div>

  <select v-model="status">
    <option>Applied</option>
    <option>Interview</option>
    <option>Offer</option>
    <option>Rejected</option>
  </select>

  <button @click="addApplication">Add Application</button>
</template>
