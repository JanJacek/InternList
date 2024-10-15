<template>
  <router-view class="bg-grey-3" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { uiStore } from './stores/uiStore';
import { UsersAccumulator, NativeUserData } from './types';

const u_store = uiStore();

async function fetchUsers() {
  try {
    const responses = await Promise.all([
      fetch('https://reqres.in/api/users?page=1'),
      fetch('https://reqres.in/api/users?page=2'),
    ]);

    const data = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    );

    const users = data
      .flatMap((page) => page.data)
      .reduce((acc: UsersAccumulator, user: NativeUserData) => {
        acc[user.id] = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
        };
        return acc;
      }, {});

    u_store.users = users;
    u_store.isDataComplete = true;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>
