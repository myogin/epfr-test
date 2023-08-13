import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNineRecommendation } from "@/models/SectionNineRecommendation";
import { group } from "console";
import {productFindOne} from "@/services/productService";
import {getPfr} from "@/services/pfrService";
import React, { useState, useEffect } from "react";


// const checkData = () => {
//     let s9_recommendId = localStorage.getItem("s9_recommendId")
//     console.log('asdasdassd', s9_recommendId)
// }

const initialState: SectionNineRecommendation = {
    section9Recommend: {
        groupId: 0,
        pfrId: 0,
        product: {
            selected: false,
            edit: false,
            subjectId: 0,
            name: "",
            type: 0,
            productType: 0,
            id: 0,
            categoryId: 0,
            companyId: 0,
            policyTerm: "",
            sumAssured: "",
            premiumPaymentType: "",
            premium: 0,
            premiumFrequency: 0,
            currency: "",
            funds: [],
            modelPortfolioRiskCategory: 0,
            higherThanRiskProfile: 0,
            nameOfOwner: 0,
            nameOfInsure: "",
            nameOfInsureOther: "",
            benefit: [],
            risk: [],
            portfolio: 0,
            fundName: "",
            fundAmount: 0,
            premiumForHospitalization: {
                cash: 0,
                cpfMedisave: 0
            },
            groupId: 0,
            premiumType: -1,
            feature: null
        },
        riders: [],
        extraRiders: []
    }
};

type Actions = {
    setParent: (value: string, name: string, groupData: any) => any;
    setProduct: (value: string, name: string, groupData: any) => any;
    setProductArr: (value: any, name: string, groupData: any) => any;
    setProductRiderArr: (value: any, name: string, groupData: any) => any;
    setProductRiderBenefitArr: (value: any, riderId: string) => any;
    setProductRiderRiskArr: (value: any, riderId: string) => any;
    setProductHospital: (value: any, name: string) => any;
    resetRecommendationProduct: () => any;
    editRecommendationProduct: (data:any) => any;
    
};

const AnalysisRecommendationProduct = create(
  devtools<SectionNineRecommendation & Actions>((set, get) => ({
    ...initialState,
    // checkData: checkData(),.
    resetRecommendationProduct: () => {
        set(initialState);
      },
    setParent: (value: string, name: string, groupData: any) => set(
        produce((draft) => {
            draft.section9Recommend[name] = value;
        })
    ),
    setProduct: (value: string, name: string, groupData: any) => set(
        produce((draft) => {
            console.log('name', name)
            draft.section9Recommend.product[name] = value;
        })
    ),
    setProductArr: (value: any, name: string, groupData: any) => set(
        produce((draft) => {
            draft.section9Recommend.product[name] = value;
        })
    ),
    setProductRiderArr: (value: any, name: string, groupData: any) => set(
        produce((draft) => {
            draft.section9Recommend[name] = value;
        })
    ),
    setProductRiderBenefitArr: (value: any, riderId: string) => set(
        produce((draft) => {
            if(draft.section9Recommend.riders.length > 0){
                draft.section9Recommend.riders.filter((valueRider:any, indexRider:any) => {
                    if(valueRider == riderId){
                        draft.section9Recommend.riders[indexRider].benefit = value
                    }else{
                        draft.section9Recommend.riders[indexRider].benefit = value
                    }
                })
            }
        })
    ),
    setProductRiderRiskArr: (value: any, riderId: string) => set(
        produce((draft) => {
            if(draft.section9Recommend.riders.length > 0){
                draft.section9Recommend.riders.filter((valueRider:any, indexRider:any) => {
                    if(valueRider == riderId){
                        draft.section9Recommend.riders[indexRider].risk = value
                    }else{
                        draft.section9Recommend.riders[indexRider].risk = value
                    }
                })
            }
        })
    ),
    setProductHospital: (value: any, name: string) => set(
        produce((draft) => {
            draft.section9Recommend.product.premiumForHospitalization[name] = value;
        })
    ),
    editRecommendationProduct: (data: any) => {
        console.log('initialState', initialState)
        // set(
        //     "section9Recommend": data
        // );
      },
  }))

);

export const useAnalysisRecommendationProduct = AnalysisRecommendationProduct;
