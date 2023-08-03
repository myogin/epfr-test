import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface State {
  ownerId?: number;
  epfrUuid?: any;
  clientUuid?: any;
  clientType?: number;
}
const initialState: State = {
  ownerId: 0,
  epfrUuid: "",
  clientUuid: "",
  clientType: 0,
};

type Actions = {
  setDataPreSingpass: (
    ownerId: number,
    epfrUuid: any,
    clientUuid: any,
    clientType: string
  ) => any;
  setClientType: (clientType: string) => any;
};

const singpassProccess = create(
  devtools(
    persist<State & Actions>(
      (set, get) => ({
        ...initialState,
        setClientType: (clientType: string) =>
          set(
            produce((drafts) => {
              drafts.clientType = clientType;
            })
          ),
        setDataPreSingpass: (
          ownerId: number,
          epfrUuid: any,
          clientUuid: any,
          clientType: string
        ) =>
          set(
            produce((drafts) => {
              drafts.ownerId = ownerId;
              drafts.epfrUuid = epfrUuid;
              drafts.clientUuid = clientUuid;
              drafts.clientType = clientType;
            })
          ),
      }),
      {
        name: "sinpassProcess",
      }
    )
  )
);

export const useSingpassProcess = singpassProccess;
