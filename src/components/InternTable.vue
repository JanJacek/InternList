<template>
  <div class="q-pa-xl" style="width: 100%; min-width: 300px; max-width: 1200px">
    <p class="text-h5 text-grey-8">User list</p>

    <q-card
      class="q-pa-md bg-grey-1"
      style="width: 100%; flex: 1; min-width: 300px"
      flat
      id="details-card"
    >
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
                      src="../assets/edit-box.svg"
                      alt="Edit"
                      class="q-icon"
                    />
                  </q-btn>
                  <q-btn
                    icon="delete"
                    color="grey-5"
                    flat
                    size="sm"
                    class="q-pa-none"
                    @click="
                      confirm.state = true;
                      confirm.userId = props.row.id;
                    "
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
    </q-card>

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
      class="bg-grey-3 q-mt-md"
    />

    <q-dialog v-model="confirm.state" backdrop-filter="none">
      <q-card>
        <q-card-section class="row items-center">
          <p class="q-ma-sm q-mt-lg">
            Are you sure you want to delete the user
            <span class="text-bold">
              {{
                `${u_store.users[confirm.userId].first_name} ${
                  u_store.users[confirm.userId].last_name
                }`
              }}</span
            >
            ?
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup no-caps />
          <q-btn
            flat
            label="Remove"
            color="primary"
            v-close-popup
            @click="deleteUser(confirm.userId)"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { uiStore } from 'src/stores/uiStore';
import { UserTableColumn } from 'src/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const u_store = uiStore();
const router = useRouter();
const confirm = ref({
  state: false,
  userId: 0,
});
const columns: UserTableColumn[] = [
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
