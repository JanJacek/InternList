<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title style="cursor: default" @click="router.push('/')">
          <q-icon name="home" size="xs"></q-icon>
          InternList
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
defineOptions({
  name: 'MainLayout',
});
</script>
