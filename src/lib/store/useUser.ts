import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
};

interface UserState {
  user: User | null | undefined;

  isLoading: boolean;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
  isLoading: true,
}));
