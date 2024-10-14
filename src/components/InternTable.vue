<template>
  <div style="width: 100%; min-width: 300px">
    <p class="text-h5 q-ml-xl text-grey-8">User list</p>
    <div class="q-ml-xl q-mr-xl bg-grey-1 q-pa-md">
      <q-table
        :flat="true"
        :rows="filteredRows"
        :columns="columns"
        row-key="name"
        style="width: 100%; height: 400px"
        class="bg-grey-1 no-border-rows"
        separator="none"
        hide-pagination
        v-model:pagination="pagination"
      >
        <template v-slot:top>
          <div class="q-my-md flex justify-between" style="width: 100%">
            <q-input
              v-model="u_store.search"
              debounce="300"
              class="q-mr-md q-mb-md"
              outlined
              placeholder="Search for users..."
              style="width: 80%; max-width: 400px"
              dense
              filled
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              label="Add User"
              no-caps
              class="q-mb-md"
              icon="add"
              color="primary"
              rounded
              @click="goToAddUser"
            />
          </div>
          <div class="bg-grey-3" style="width: 100%; height: 1px"></div>
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
              <template v-else-if="col.name === 'actions'">
                <div class="q-gutter-xs">
                  <q-btn
                    @click="goToEditUser(props.row.id)"
                    flat
                    size="xs"
                    class="q-pa-none"
                  >
                    <img
                      src="../assets/edit-icon.svg"
                      alt="Edit"
                      class="q-icon"
                    />
                  </q-btn>
                  <q-btn
                    icon="delete"
                    color="grey-5"
                    flat
                    size="xs"
                    class="q-pa-none"
                    @click="deleteUser(props.row.id)"
                  />
                </div>
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
        color="primary"
        active-design="unelevated"
        active-color="primary"
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
import { useRouter } from 'vue-router';
const u_store = uiStore();
const router = useRouter();

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
    sortable: false,
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
    sortable: false,
    align: 'left',
    style: 'width: 140px',
  },
];
const filteredRows = computed(() => u_store.filteredTableRowData);

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const pagesNumber = computed(() =>
  Math.ceil(Object.keys(u_store.users).length / pagination.value.rowsPerPage)
);

const goToAddUser = () => {
  console.log('hello');
  router.push({ path: '/user/new' });
};

const goToEditUser = (id: number) => {
  router.push({ path: `/user/${id}` });
};

const deleteUser = (id: number) => {
  delete u_store.users[id];
};
</script>

<style>
.q-table__top {
  padding: 0px !important;
}
.q-icon {
  fill: var(--q-color-grey-5);
}
</style>
