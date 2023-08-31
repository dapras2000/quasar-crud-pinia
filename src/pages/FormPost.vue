<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter0sm">
      <q-input
        outlined
        v-model="form.title"
        label="Title"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="form.author"
        label="Author"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="col-lg-6 col-xs-12">
        <q-editor v-model="form.content" min-height="5rem"></q-editor>
      </div>

      <div class="col-12 q-gutter-sm q-pa-sm">
        <q-btn
          label="Cancel"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        ></q-btn>
        <q-btn
          type="submit"
          label="Submit"
          color="primary"
          class="float-right text-primary"
          icon="save"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { usePostStore } from "src/stores/post-store";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

const postStore = usePostStore();

const router = useRouter();
const $q = useQuasar();
const route = useRoute();
const form = ref({
  title: "",
  content: "",
  author: "",
});

onMounted(async () => {
  if (route.params.id) {
    getPost(route.params.id);
  }
});

const getPost = async (id) => {
  try {
    const res = await postStore.getById(id);
    form.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = async () => {
  try {
    if (form.value.id) {
      await postStore.update(form.value);
    } else {
      await postStore.post(form.value);
    }

    $q.notify({
      message: "Data Berhasil Disimpan",
      icon: "check",
      color: "positive",
    });
    router.push({ name: "home" });
  } catch (error) {
    $q.notify({
      message: "Data Gagal Ditambah",
      icon: "check",
      color: "negative",
    });
  }
};
</script>
