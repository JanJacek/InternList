<template>
  <div class="q-pa-xl" style="width: 100%; min-width: 300px; max-width: 1200px">
    <p class="text-h5 text-grey-8">
      {{ !isEditMode ? 'Add user' : 'Modify User' }}
    </p>

    <div
      class="flex justify-between q-gutter-r-md"
      style="height: 300px; width: 100%"
    >
      <q-card
        class="column q-mr-md q-pt-xl justify-between"
        style="width: 100%; flex: 1"
        flat
      >
        <q-card-section class="row" style="gap: 20px; flex: 1">
          <q-input
            v-model="user.first_name"
            label="First Name"
            outlined
            dense
            class="col"
          />
          <q-input
            v-model="user.last_name"
            label="Last Name"
            outlined
            dense
            class="col"
          />
        </q-card-section>

        <q-card-section class="q-mt-auto self-start">
          <q-btn
            dense
            color="primary"
            label="Update details"
            @click="saveUser"
            no-caps
            class="q-px-md"
          />
        </q-card-section>
      </q-card>

      <q-card
        flat
        class="column bg-grey-1"
        style="width: 100%; max-width: 350px"
      >
        <q-card-section class="q-pt-xl">
          <div class="flex justify-center">
            <q-avatar size="100px">
              <img
                :src="
                  user.avatar ||
                  'https://mir-s3-cdn-cf.behance.net/user/230/a612cd468481191.5fe6938245733.png'
                "
              />
            </q-avatar>
          </div>
        </q-card-section>

        <q-card-section class="q-mt-auto self-start" style="width: 100%">
          <label for="file-upload" class="custom-file-upload text-grey-8">
            <q-icon name="photo_camera"></q-icon>
            Change photo
          </label>
          <input id="file-upload" type="file" @change="onFileChange" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { uiStore } from 'src/stores/uiStore';

const router = useRouter();
const route = useRoute();
const u_store = uiStore();

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  avatar: '',
});

const isEditMode = ref(false);

onMounted(() => {
  const userId = route.params.id;
  console.log('object', userId);
  if (userId !== 'new') {
    isEditMode.value = true;

    const existingUser = u_store.users[Number(route.params.id)];

    console.log('existingUser', u_store.users);
    if (existingUser) {
      console.log(existingUser);
      user.value = { ...existingUser };
    }
  }
});

const saveUser = () => {
  if (isEditMode.value) {
    u_store.users[Number(route.params.id)] = { ...user.value };
  } else {
    const newId = Date.now();
    u_store.users[newId] = { ...user.value };
  }
  router.push('/');
};

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        user.value.avatar = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #bbbbbb;
  display: inline-block;
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
</style>
