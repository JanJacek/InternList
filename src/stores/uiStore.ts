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
  getters: {
    // create data for table rows
    tableRowData(): {
      id: number;
      email: string;
      full_name: string;
      avatar: string;
    }[] {
      return this.users.map((user) => ({
        id: user.id,
        email: user.email,
        full_name: `${user.first_name} ${user.last_name}`,
        avatar: user.avatar,
      }));
    },
  },
  actions: {},
});
