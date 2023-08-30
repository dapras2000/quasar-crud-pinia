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

<script>
import postsService from "src/services/posts";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FormPost",
  setup() {
    const { post, getById, update } = postsService();
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
        // const response = await getById(route.params.id);
        // console.log(response);
        getPost(route.params.id);
      }
    });

    const getPost = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value);
        } else {
          await post(form.value);
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

    return {
      form,
      onSubmit,
    };
  },
});
</script>
