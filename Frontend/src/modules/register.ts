export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface State {
  register: RegisterData[];
}
