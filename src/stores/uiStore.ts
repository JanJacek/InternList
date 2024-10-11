import { defineStore } from 'pinia';

export const uiStore = defineStore('InternStore', {
  state: (): {
    users: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    }[];
    isDataComplete: boolean;
  } => ({
    users: [],
    isDataComplete: false,
  }),
  getters: {},
  actions: {},
});
