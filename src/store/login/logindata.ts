import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface Login {
  token?: any;
  ownerId?: any;
  pfrId?: number;
}
const initialState: Login = {
  token: "",
  ownerId: "",
  pfrId: 0,
};

type Actions = {
  setLogin: (token: any, ownerId: any) => any;
};

const loginData = (set: any) => ({
  ...initialState,
  setLogin: (token: any, ownerId: any) =>
    set(
      produce((drafts: any) => {
        drafts.token = token;
        drafts.ownerId = ownerId;
      })
    ),
});

export const useLoginData = create(
  devtools(
    persist<Login & Actions>(loginData, {
      name: "login",
    })
  )
);
