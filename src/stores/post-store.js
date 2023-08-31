import { defineStore } from "pinia";
import { api } from "../boot/axios";

export const usePostStore = defineStore("post", {
  state: () => ({
    id: null,
    title: null,
    author: null,
    content: null,
    posts: null,
    form: null,
  }),
  getters: {},
  actions: {
    async list() {
      try {
        return await api.get("/posts");
      } catch (error) {
        if (error) throw error;
      }
    },

    async getById(id) {
      try {
        return await api.get(`/posts/${id}`);
      } catch (error) {
        throw new Error(error);
      }
    },

    async post(form) {
      try {
        await api.post("/posts", form);
      } catch (error) {
        throw new Error(error);
      }
    },

    async update(form) {
      try {
        return await api.put(`posts/${form.id}`, form);
      } catch (error) {
        throw new Error(error);
      }
    },

    async remove(id) {
      try {
        await api.delete(`/posts/${id}`);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
