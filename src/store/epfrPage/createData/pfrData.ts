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
    section1: undefined,
    section2: undefined,
    section3: undefined,
    section4: undefined,
    section5: undefined,
    section6: undefined,
    section7: undefined,
    section8: undefined,
    section9: undefined,
    section10: undefined,
    section11: undefined,
    section12: undefined,
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
    editableSection1: undefined,
    editableSection2: undefined,
    editableSection3: undefined,
    editableSection4: undefined,
    editableSection5: undefined,
    editableSection6: undefined,
    editableSection7: undefined,
    editableSection8: undefined,
    editableSection9: undefined,
    editableSection10: undefined,
    editableSection11: undefined,
    editableSection12: undefined,
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
              draft.pfr.section1 = params.section1;
              draft.pfr.section2 = params.section2;
              draft.pfr.section3 = params.section3;
              draft.pfr.section4 = params.section4;
              draft.pfr.section5 = params.section5;
              draft.pfr.section6 = params.section6;
              draft.pfr.section7 = params.section7;
              draft.pfr.section8 = params.section8;
              draft.pfr.section9 = params.section9;
              draft.pfr.section10 = params.section10;
              draft.pfr.section11 = params.section11;
              draft.pfr.section12 = params.section12;
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
              draft.pfr.editableSection1 = params.editableSection1;
              draft.pfr.editableSection2 = params.editableSection2;
              draft.pfr.editableSection3 = params.editableSection3;
              draft.pfr.editableSection4 = params.editableSection4;
              draft.pfr.editableSection5 = params.editableSection5;
              draft.pfr.editableSection6 = params.editableSection6;
              draft.pfr.editableSection7 = params.editableSection7;
              draft.pfr.editableSection8 = params.editableSection8;
              draft.pfr.editableSection9 = params.editableSection9;
              draft.pfr.editableSection10 = params.editableSection10;
              draft.pfr.editableSection11 = params.editableSection11;
              draft.pfr.editableSection12 = params.editableSection12;
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
