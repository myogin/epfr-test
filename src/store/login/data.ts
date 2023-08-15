import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface Login {
  userEmail: string;
}
const initialState: Login = {
  userEmail: "",
};

type Actions = {
  setUserEmail: (userEmail: string) => any;
  deleteEmail: () => any;
};

const userData = (set: any) => ({
  ...initialState,
  setUserEmail: (userEmail: string) =>
    set(
      produce((drafts: any) => {
        drafts.userEmail = userEmail;
      })
    ),
  deleteEmail: () =>
    set(
      produce((drafts: any) => {
        drafts.userEmail = "";
      })
    ),
});

export const useUserData = create(
  devtools(
    persist<Login & Actions>(userData, {
      name: "mailVerify",
    })
  )
);
