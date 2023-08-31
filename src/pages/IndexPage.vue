<template>
  <q-page padding>
    <q-table title="Posts" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Posts</span><q-space />
        <q-btn color="primary" label="New" :to="{ name: 'formPost' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEditPost(props.row.id)"
          ></q-btn>
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeletePost(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { usePostStore } from "src/stores/post-store";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const $q = useQuasar();
const router = useRouter();
const posts = ref([]);
const columns = [
  { name: "id", field: "id", label: "Id", sortable: true, align: "left" },
  {
    name: "title",
    field: "title",
    label: "Title",
    sortable: true,
    align: "left",
  },
  {
    name: "author",
    field: "author",
    label: "Auhtor",
    sortable: true,
    align: "left",
  },
  {
    name: "actions",
    field: "actions",
    label: "Actions",
    sortable: true,
    align: "right",
  },
];

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  try {
    const res = await postStore.list();
    posts.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const handleEditPost = (id) => {
  router.push({ name: "formPost", params: { id } });
};

const handleDeletePost = async (id) => {
  try {
    $q.dialog({
      title: "Hapus Data",
      message: "Apakah yakin data akan dihapus",
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await postStore.remove(id);
      $q.notify({
        message: "Data Berhasil Dihapus",
        icon: "check",
        color: "positive",
      });
      getPosts();
    });
  } catch (error) {
    $q.notify({
      message: "Data Gagal Dihapus",
      icon: "check",
      color: "negative",
    });
  }
};
</script>
