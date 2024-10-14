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
    search: string;
  } => ({
    users: [],
    isDataComplete: false,
    search: '',
  }),
  getters: {
    // create data for table rows
    tableRowData(state) {
      return state.users.map((user) => ({
        id: user.id,
        email: user.email,
        full_name: `${user.first_name} ${user.last_name}`,
        avatar: user.avatar,
      }));
    },
    // Dodaj getter do filtrowania danych tylko po full_name
    filteredTableRowData(
      state
    ): { id: number; email: string; full_name: string; avatar: string }[] {
      if (!state.search) {
        return this.tableRowData;
      }
      const searchLower = state.search.toLowerCase();
      return this.tableRowData.filter((row) =>
        row.full_name.toLowerCase().includes(searchLower)
      );
    },
  },
  actions: {},
});
