<template>
  <router-view class="bg-grey-3" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { uiStore } from './stores/uiStore';

// defineOptions({
//   name: 'App',
// });

const u_store = uiStore();

async function fetchUsers() {
  try {
    const response = await fetch('https://reqres.in/api/users?page=2');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    u_store.users = data.data;
    u_store.isDataComplete = true;
    console.log(u_store.users);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>
