<template>
  <div class="q-ma-xl q-pa-xl bg-grey-1" v-if="u_store.isDataComplete">
    <p class="text-h5 text-grey-7">User list</p>
    <div v-for="user in u_store.users" :key="user.id">
      <p>{{ user }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uiStore } from 'src/stores/uiStore';

const u_store = uiStore();
</script>
