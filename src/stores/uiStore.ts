import { defineStore } from 'pinia';
import { FiltratedData, UiStore } from 'src/types';

export const uiStore = defineStore('InternStore', {
  state: (): UiStore => ({
    users: {},
    isDataComplete: false,
    search: '',
  }),
  getters: {
    // create data for table rows
    tableRowData(state) {
      return Object.entries(state.users).map(([id, user]) => ({
        id: Number(id),
        email: user.email,
        full_name: `${user.first_name} ${user.last_name}`,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      }));
    },
    // Dodaj getter do filtrowania danych tylko po full_name
    filteredTableRowData(state): FiltratedData[] {
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
