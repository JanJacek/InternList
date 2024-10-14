<template>
  <div style="width: 100%">
    <p class="text-h5 q-ml-xl text-grey-8">User list</p>
    <div
      class="q-ml-xl q-mr-xl bg-grey-1 q-pa-md"
      v-if="u_store.isDataComplete"
    >
      <q-table
        :flat="true"
        :rows="filteredRows"
        :columns="columns"
        row-key="name"
        style="width: 100%; height: 360px"
        class="bg-grey-1 no-border-rows"
        separator="none"
        hide-pagination
        v-model:pagination="pagination"
      >
        <template v-slot:top>
          <div class="q-my-md" style="width: 100%">
            <q-input
              v-model="u_store.search"
              debounce="300"
              outlined
              placeholder="Search"
              style="width: 100%; max-width: 400px"
              dense
              filled
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="{ 'bg-grey-3': props.rowIndex % 2 === 1 }"
          >
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'avatar'">
                <q-avatar size="lg">
                  <img :src="props.row.avatar" />
                </q-avatar>
              </template>
              <template v-else>
                {{ props.row[col.field] }}
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row q-mt-md q-ml-xl">
      <q-pagination
        :max="pagesNumber"
        v-model="pagination.page"
        direction-links
        outline
        color="teal-9"
        active-design="unelevated"
        active-color="teal-9"
        active-text-color="white"
        :rounded="false"
        gutter="3px"
        class="bg-grey-3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { uiStore } from 'src/stores/uiStore';
import { computed, ref } from 'vue';
const u_store = uiStore();

const columns: {
  name: string;
  label: string;
  field: string;
  sortable: boolean;
  align?: 'left' | 'right' | 'center';
  style?: string;
}[] = [
  {
    name: 'avatar',
    label: '',
    field: 'avatar',
    sortable: true,
    align: 'left',
    style: 'width: 50px',
  },
  {
    name: 'name',
    label: 'Full Name',
    field: 'full_name',
    sortable: true,
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Action',
    field: 'id',
    sortable: true,
    align: 'right',
  },
];

const filteredRows = computed(() => u_store.filteredTableRowData);

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const pagesNumber = Math.ceil(
  u_store.users.length / pagination.value.rowsPerPage
);

// const rows = u_store.tableRowData;
</script>

<style>
.q-table__top {
  padding: 0px !important;
}
</style>
