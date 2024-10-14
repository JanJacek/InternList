export interface Person {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface NativeUserData extends Person {
  id: number;
}

export interface User extends Person {}

export interface FiltratedData extends Person {
  id: number;
  full_name: string;
}

export interface UsersObject extends Record<number, User> {}

export interface UsersAccumulator
  extends Record<number, Omit<NativeUserData, 'id'>> {}

export interface UiStore {
  users: UsersObject;
  isDataComplete: boolean;
  search: string;
}

export interface UserTableColumn {
  name: string;
  label: string;
  field: string;
  sortable: boolean;
  align?: 'left' | 'right' | 'center';
  style?: string;
}
