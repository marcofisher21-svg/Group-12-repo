<script setup>
import { RouterLink } from 'vue-router';
import  HRlogo from '../assets/hr logo.webp'
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
  
      <router-link to="/dashboard">
        <img :src="HRlogo"
        height="40"
        />
      </router-link>
      <a :src class="navbar-brand" href=""></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link active" aria-current="page" >Dashboard</router-link>
          </li>
          <li class="nav-item">
                <router-link to="/attendance" class="nav-link attendance" > Attendance</router-link>
          </li>
          <li class="nav-item">
              <router-link to="/payroll" class="nav-link attendance payroll" >Payroll</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/employee" class="nav-link attendance employee" >Employees</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/leave" class="nav-link leave">Leave</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/application" class="nav-link application">Application</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
