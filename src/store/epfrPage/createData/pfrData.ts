import { PfrDataModel } from "@/models/Pfr";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  fetchPfr: (params: any) => any;
  resetPfr: () => any;
  setPfr: (name: string, value: any) => any;
};

const initialState: PfrDataModel = {
  pfr: {
    type: 0,
    ownerId: 0,
    status: 0,
    editable: 0,
    section1: 0,
    section2: 0,
    section3: 0,
    section4: 0,
    section5: 0,
    section6: 0,
    section7: 0,
    section8: 0,
    section9: 0,
    section10: 0,
    section11: 0,
    section12: 0,
    pdf_1: undefined,
    folder1: undefined,
    folder2: undefined,
    document1: undefined,
    document2: undefined,
    deleted: 0,
    folderId: undefined,
    documentId: undefined,
    folderIdOfSubmission: undefined,
    documentIdOfSubmission: undefined,
    documentIdOfSubmission2: undefined,
    epfr_uuid: undefined,
    client_reg_type: undefined,
    editableSection1: 0,
    editableSection2: 0,
    editableSection3: 0,
    editableSection4: 0,
    editableSection5: 0,
    editableSection6: 0,
    editableSection7: 0,
    editableSection8: 0,
    editableSection9: 0,
    editableSection10: 0,
    editableSection11: 0,
    editableSection12: 0,
    gate1: 0,
    gate2: 0,
    gate3: 0,
    gate4: 0,
    gate5: 0,
    gate6: 0,
    gate7: 0,
    gate8: 0,
    gate9: 0,
    gate10: 0,
    gate11: 0,
    gate12: 0
  },
};

const pfrData = create(
  devtools(
    persist<PfrDataModel & Actions>(
      (set, get) => ({
        ...initialState,
        fetchPfr: (params: any) =>
          set(
            produce((draft) => {
              draft.pfr.type = params.type;
              draft.pfr.ownerId = params.ownerId;
              draft.pfr.status = params.status;
              draft.pfr.editable = params.editable;
              draft.pfr.section1 = params.section1 >=0 ? params.section1 : 0;
              draft.pfr.section2 = params.section2 >=0 ? params.section2 : 0;
              draft.pfr.section3 = params.section3 >=0 ? params.section3 : 0;
              draft.pfr.section4 = params.section4 >=0 ? params.section4 : 0;
              draft.pfr.section5 = params.section5 >=0 ? params.section5 : 0;
              draft.pfr.section6 = params.section6 >=0 ? params.section6 : 0;
              draft.pfr.section7 = params.section7 >= 0 ? params.section7 : 0;
              draft.pfr.section8 = params.section8 >= 0 ? params.section8 : 0;
              draft.pfr.section9 = params.section9 >= 0 ? params.section9 : 0;
              draft.pfr.section10 = params.section10 >= 0 ? params.section10 : 0;
              draft.pfr.section11 = params.section11 >=0 ? params.section11 : 0;
              draft.pfr.section12 = params.section12 >=0 ? params.section12 : 0;
              draft.pfr.pdf_1 = params.pdf_1;
              draft.pfr.folder1 = params.folder1;
              draft.pfr.folder2 = params.folder2;
              draft.pfr.document1 = params.document1;
              draft.pfr.document2 = params.document2;
              draft.pfr.deleted = params.deleted;
              draft.pfr.folderId = params.folderId;
              draft.pfr.documentId = params.documentId;
              draft.pfr.folderIdOfSubmission = params.folderIdOfSubmission;
              draft.pfr.documentIdOfSubmission = params.documentIdOfSubmission;
              draft.pfr.documentIdOfSubmission2 =
                params.documentIdOfSubmission2;
              draft.pfr.epfr_uuid = params.epfr_uuid;
              draft.pfr.client_reg_type = params.client_reg_type;
              draft.pfr.editableSection1 = params.editableSection1 >= 0 ? params.editableSection1 : 0;
              draft.pfr.editableSection2 = params.editableSection2 >= 0 ? params.editableSection2 : 0;
              draft.pfr.editableSection3 = params.editableSection3 >= 0 ? params.editableSection3 : 0;
              draft.pfr.editableSection4 = params.editableSection4 >= 0 ? params.editableSection4 : 0;
              draft.pfr.editableSection5 = params.editableSection5 >= 0 ? params.editableSection5 : 0;
              draft.pfr.editableSection6 = params.editableSection6 >= 0 ? params.editableSection6 : 0;
              draft.pfr.editableSection7 = params.editableSection7 >= 0 ? params.editableSection7 : 0;
              draft.pfr.editableSection8 = params.editableSection8 >= 0 ? params.editableSection8 : 0;
              draft.pfr.editableSection9 = params.editableSection9 >= 0 ? params.editableSection9 : 0;
              draft.pfr.editableSection10 = params.editableSection10 >= 0 ? params.editableSection10 : 0;
              draft.pfr.editableSection11 = params.editableSection11 >= 0 ? params.editableSection11 : 0;
              draft.pfr.editableSection12 = params.editableSection12 >= 0 ? params.editableSection12 : 0;

              // Gate Setting
              draft.pfr.gate1 = 0
              draft.pfr.gate2 = 0
              draft.pfr.gate3 = 0
              draft.pfr.gate4 = 0
              draft.pfr.gate5 = 0
              draft.pfr.gate6 = 0
              draft.pfr.gate7 = 0
              draft.pfr.gate8 = 0
              draft.pfr.gate9 = 0
              draft.pfr.gate10 = 0
              draft.pfr.gate11 = 0
              draft.pfr.gate12 = 0
            })
          ),
        resetPfr: () => {
          set(initialState);
        },
        setPfr: (name: string, value: any) =>
          set(
            produce((draft) => {
              let pfr = draft.pfr;
              pfr[name] = value;
            })
          ),
      }),
      {
        name: "pfrs",
      }
    )
  )
);

export const usePfrData = pfrData;
