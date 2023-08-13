import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface Login {
  token?: any;
  ownerId?: any;
  name?: any;
}
const initialState: Login = {
  token: "",
  ownerId: "",
  name: "",
};

type Actions = {
  setLogin: (token: any, ownerId: any, name: any) => any;
  delLogin: () => any;
};

const loginData = (set: any) => ({
  ...initialState,
  setLogin: (token: any, ownerId: any, name: any) =>
    set(
      produce((drafts: any) => {
        drafts.token = token;
        drafts.ownerId = ownerId;
        drafts.name = name;
      })
    ),
  delLogin: () =>
    set(
      produce((drafts: any) => {
        drafts.token = "";
        drafts.ownerId = "";
        drafts.name = "";
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
