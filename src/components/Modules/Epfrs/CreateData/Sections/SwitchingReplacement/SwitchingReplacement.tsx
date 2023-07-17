import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  id?: any;
  pfrType?: number;
}

const SwitchingReplacement = (props: Props) => {
  const fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  const premiumTypes: Array<any> = [
    { id: "0", name: "Premium(Single)" },
    { id: "1", name: "Premium(Annual)" },
    { id: "2", name: "Investment" },
  ];

  const clientTypes: Array<any> = [
    { id: "0", name: "Client1" },
    // { id: "1", name: "Client2" },
  ];

  const productData = {
    index: -1,
    owner: 0,
    companyName: "",
    typeOfProduct: "",
    premium: "0",
    premiumType: 0,
    benefit: "",
    inceptionDate: "",
    maturityDate: "",
  };

  const products: any[] = [];

  const [showReason, setShowReason] = useState(0);
  const [showReasonTwo, setShowReasonTwo] = useState(0);
  const [showProductDetailTable, setShowProductDetailTable] = useState(0);
  const [newProduct, setNewProduct] = useState(productData);
  const [newProductErrors, setNewProductErrors] = useState<Array<any>>([]);
  const [sectionTenData, setSectionTenData] = useState({
    id: 0,
    needs: 0,
    data: [
      {
        answer1: {
          a: {
            answer: 0,
            reason: "",
          },
          b: 0
        },
        answer2: 0,
        answer3: null,
        answer4: {
          companyName: null,
          typeOfProduct: null,
          premium: 0,
          premiumType: null,
          benefit: null,
          inceptionDate: null,
          maturityDate: null
        },
        answer5: 1,
        answer6: 1,
        answer7: 1,
        answer8: 1,
        answer9: 1,
        answer10: 1
      }
    ],
    issues: [],
    originalProduct: products,
    status: 1
  });

  const setData = (params: any) => {
    setShowReason(params);
    setSectionTenData({
      ...sectionTenData,
      data: sectionTenData.data?.map((item, i) => {
        if (i==0) {
          return {
            ...item,
            answer1: {
              ...item.answer1,
              a: {
                ...item.answer1.a,
                answer: params
              }
            }
          };
        } else {
          return item;
        }
      })
    });
  };

  const setDataTwo = (params: any) => {
    setShowReasonTwo(params);
    setSectionTenData({
      ...sectionTenData,
      data: sectionTenData.data?.map((item, i) => {
        if (i==0) {
          return {
            ...item,
            answer1: {
              ...item.answer1,
              b: params,
            }
          };
        } else {
          return item;
        }
      })
    });
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setNewProduct({
      ...sectionTenData.originalProduct[params],
      index: params
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setNewProductErrors([]);
    setNewProduct(productData);
    setShowModal(false);
  };

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const addProductData = () => {
    const errors = checkNewProduct();
    if (errors.length) return;
    
    const productList = sectionTenData.originalProduct;

    if (newProduct.index !== -1) {
      productList[newProduct.index] = newProduct;
    } else {
      productList.push(newProduct);
    }

    setNewProduct(productData);
    setSectionTenData({
      ...sectionTenData,
      originalProduct: productList
    });
    closeModal();
  }

  const removeProductData = (index: any) => {
    console.log(index);
    const productList = sectionTenData.originalProduct;
    productList.splice(index,1);
    setSectionTenData({
      ...sectionTenData,
      originalProduct: productList
    });
  }

  const checkNewProduct = () => {
    let errors = [];
    if (newProduct.owner < 0) {
      errors.push({name: "Client"});
    }
    
    if (newProduct.companyName.trim() === "") {
      errors.push({name: "Company Name"});
    }
    
    if (newProduct.typeOfProduct.trim() === "") {
      errors.push({name: "Type Of Product"});
    }
    
    if (newProduct.premium.trim() === "0") {
      errors.push({name: "Premium Amount"});
    }
    
    if (newProduct.premiumType < 0) {
      errors.push({name: "Premium Type"});
    }
    
    if (newProduct.benefit.trim() === "") {
      errors.push({name: "Benefit Provided"});
    }

    setNewProductErrors(errors);
    return errors;
  }

  useEffect(() => {
    localStorage.setItem('section10', JSON.stringify(sectionTenData));
  }, [sectionTenData]);

  const scrollPosition = useScrollPosition(10)
  return (
    <div id={props.id}>
      <div id="section-header-10" className={`sticky top-0 z-10 ${scrollPosition === "okSec10" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec10" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 10. Switching / Replacement
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            1a. Have you withdrawn / surrendered / terminated, in part or in
            full any existing insurance policy or investment product within the
            last 12 months?
          </TextThin>
          <Select
            value={showReason}
            datas={fillInformation}
            handleChange={(event) => setData(eval(event.target.value))}
          />
          {showReason == 1 ? (
            <RowSingleGrid>
              <TextArea 
              label="Please state reasons:" 
              defaultValue={sectionTenData.data[0]?.answer1?.a?.reason}
              handleChange={function(event) {
                setSectionTenData({
                  ...sectionTenData,
                  data: sectionTenData.data?.map((item, i) => {
                    if (i==0) {
                      return {
                        ...item,
                        answer1: {
                          ...item.answer1,
                          a: {
                            ...item.answer1.a,
                            reason: event.target.value
                          }
                        }
                      };
                    } else {
                      return item;
                    }
                  })
                });
              }} />
            </RowSingleGrid>
          ) : null}
        </RowSingleGrid>

        {/* Question 1.b */}
        <RowSingleGrid>
          <TextThin>
            1b. Are you switching / replacing in part or in full any existing
            insurance policy or investment product purchased from Legacy FA Pte
            Ltd or any other Financial Institution(s)?
          </TextThin>
          <Select
            value={showReasonTwo}
            datas={fillInformation}
            handleChange={(event) => setDataTwo(eval(event.target.value))}
          />
        </RowSingleGrid>
        {showReasonTwo == 1 ? (
          <>
            <RowSingleGrid>
              <TextThin>
                2. Is the switch / replacement of insurance policy and/or
                investment product advised by the Representative ?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer2}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer2: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                3. What are the reason(s) for switching / replacing your
                insurance policy and/or investment product?
              </TextThin>
              <TextArea label="Please state reasons:" defaultValue="" />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>4. Do you have details of original product?</TextThin>
              <Select
                value={showProductDetailTable}
                datas={fillInformation}
                handleChange={function(event) {
                  setShowProductDetailTable(eval(event.target.value));
                }}
              />
            </RowSingleGrid>

            {(showProductDetailTable===1) && (
              <SectionCardSingleGrid>
              <div className="w-full">
                <ButtonBox onClick={openModal} className="text-green-deep">
                  <AddLineIcon />
                </ButtonBox>

                <Transition appear show={showModal} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-opacity-25 bg-gray-light" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Add Dependent
                            </Dialog.Title>
                            <div className="mt-2">
                              <div className="flex">
                                <Select
                                    className="my-4"
                                    label="Client"
                                    name="clientName"
                                    datas={clientTypes}
                                    value={newProduct.owner}
                                    handleChange={(e) =>{
                                      console.log(e.target.selectedIndex);
                                      setNewProduct({
                                        ...newProduct,
                                        owner: e.target.selectedIndex,
                                      });
                                    }}
                                  />
                                {/* <Input
                                  className="my-4"
                                  label="Client"
                                  name="clientName"
                                  type="text"
                                  value={newProduct.owner}
                                  placeholder="Client name"
                                  handleChange={(e) =>
                                    console.log(e.target.value)
                                  }
                                /> */}
                              </div>
                              <div className="flex">
                                <Input
                                  className="my-4"
                                  label="Company Name"
                                  name="companyName"
                                  type="text"
                                  value={newProduct.companyName}
                                  handleChange={(e) =>
                                    setNewProduct({
                                      ...newProduct,
                                      companyName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex">
                                <Input
                                  className="my-4"
                                  label="Type Of Product"
                                  name="typeOfProduct"
                                  type="text"
                                  value={newProduct.typeOfProduct}
                                  handleChange={(e) =>
                                    setNewProduct({
                                      ...newProduct,
                                      typeOfProduct: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex">
                                  <Select
                                    className="my-4"
                                    label="Premium/Investment"
                                    name="premiumType"
                                    datas={premiumTypes}
                                    value={newProduct.premiumType}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        premiumType: e.target.selectedIndex,
                                      })
                                    }
                                  />
                                  {/* <DatePicker className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong" selected={newProduct.dateOfBirth} onChange={(date) => checkBirthDate(date)} /> */}
                                  {/* <Input
                                    className="my-4"
                                    label="Date Of Birth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={newProduct.dateOfBirth}
                                    handleChange={(event) =>
                                      checkBirthDate(event.target.value)
                                    }
                                  /> */}
                              </div>
                              <div className="flex">
                                <Input
                                  onWheel={(e) => e.currentTarget.blur()}
                                  className="my-4"
                                  label="Premium Amount"
                                  name="premium"
                                  type="number"
                                  value={newProduct.premium}
                                  handleChange={(e) =>
                                    setNewProduct({
                                      ...newProduct,
                                      premium: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex">
                                <Input
                                  className="my-4"
                                  label="Benefit Provided"
                                  name="benefit"
                                  type="text"
                                  value={newProduct.benefit}
                                  handleChange={(e) =>
                                    setNewProduct({
                                      ...newProduct,
                                      benefit: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            {(newProductErrors.length > 0) && (
                              <div className="mt-4">
                                {newProductErrors.map(({name}) => (
                                  <p key={name} style={{fontSize: '14px', color: 'red'}}>
                                    - {name} is required
                                  </p>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-4 mt-4">
                              <ButtonGreenMedium onClick={addProductData}>
                                Save
                              </ButtonGreenMedium>
                              <ButtonTransparentMedium onClick={closeModal}>
                                Cancel
                              </ButtonTransparentMedium>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
              {sectionTenData?.originalProduct.length > 0 && (
                <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
                  <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
                    <thead className="text-left bg-white-bone">
                      <tr className="border-b border-gray-soft-strong">
                        <th className="px-2 py-5">SN</th>
                        <th className="px-2 py-5">Client</th>
                        <th className="px-2 py-5">Company Name</th>
                        <th className="px-2 py-5">Type Of Product</th>
                        <th className="px-2 py-5">Premium/Investment Amount</th>
                        <th className="px-2 py-5">Benefits Provided</th>
                        <th className="px-2 py-5"></th>
                      </tr>
                    </thead>
                    <tbody>
                        {sectionTenData.originalProduct.map((data, index) => (
                          <tr className="test" key={"product-" + index}>
                            <td className="px-2 py-5">{index+1}</td>
                            <td className="px-2 py-5">{clientTypes[data.owner].name}</td>
                            <td className="px-2 py-5">{data.companyName}</td>
                            <td className="px-2 py-5">{data.typeOfProduct}</td>
                            <td className="px-2 py-5">
                              <p>{premiumTypes[data.premiumType].name}</p>
                              <p>{data.premium}</p>
                            </td>
                            <td className="px-2 py-5">{data.benefit}</td>
                            <td className="w-1/12 px-2 py-5">
                              <div className="flex w-full gap-2">
                                <ButtonBox
                                  onClick={() => openModalEdit(index)}
                                  className="text-green-deep"
                                >
                                  <PencilLineIcon size={14} />
                                </ButtonBox>
                                <ButtonBox onClick={() => removeProductData(index)} className="text-red">
                                  <CloseLineIcon size={14} />
                                </ButtonBox>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCardSingleGrid>
            )}

            <RowSingleGrid>
              <TextThin>
                5. Has the Representative explained to you that you may incur
                transaction costs without gaining any real benefit from the
                replacement?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer5}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer5: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                6. Has the Representative explained to you that you may incur
                penalties for terminating any of your existing policies?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer6}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer6: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                7. Has the Representative explained to you that the replacement
                plan may offer a lower level of benefit at a higher cost or same
                cost, or offer the same level of benefit at a higher cost?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer7}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer7: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                8. Has the Representative explained to you that the replacement
                plan may be less suitable and the terms and conditions may
                differ?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer8}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer8: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                9. Has the Representative explained to you that you may not be
                insurable at standard terms?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer9}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer9: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                10. Has the Representative explained to you that there may be
                other options available besides policy replacement (eg. Free
                switching facilities for investment policy)?
              </TextThin>
              <Select
                value={sectionTenData.data[0]?.answer10}
                datas={fillInformation}
                handleChange={function(event) {
                  setSectionTenData({
                    ...sectionTenData,
                    data: sectionTenData.data?.map((item, i) => {
                      if (i==0) {
                        return {
                          ...item,
                          answer10: eval(event.target.value)
                        };
                      } else {
                        return item;
                      }
                    })
                  });
                }}
              />
            </RowSingleGrid>
          </>
        ) : null}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default SwitchingReplacement;
