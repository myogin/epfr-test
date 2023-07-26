import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { clientIdentity, getLength } from "@/libs/helper";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React from "react";

interface Props {
  pfrType?: number;
}
const Accompainment = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  let { accompaniment, setAccompaniment } = usePersonalInformation();

  let englishLevel: Array<any> = [
    { id: 1, name: "Proficient" },
    { id: 2, name: "Not Proficient" },
  ];

  let educationLevel: Array<any> = [
    { id: 1, name: "Primary" },
    { id: 2, name: "Secondary" },
    { id: 3, name: "GCE 'N' or 'O' Level Certifications, or Equivalent" },
    { id: 4, name: "Pre-Tertiary" },
    { id: 5, name: "Tertiary and above" },
  ];

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setAccompaniment(0, name, value);
  };

  const changeData = (params: any) => {};

  const setData = (params: any) => {
    console.log(params);
  };

  return (
    <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
      {props.pfrType === 1 ? (
        <>
          <div>
            <Input
              className="mb-10"
              label="Age"
              type="text"
              readonly
              placeholder="Below 62"
              value={accompaniment[0].age == 0 ? "Below 62" : "62 or above"}
            />
            <Select
              className="mb-10"
              label="Spoken English Language Proficiency"
              value={accompaniment[0].english_spoken}
              name="english_spoken"
              datas={englishLevel}
              handleChange={handleInputChange}
            />
          </div>
          <div>
            <Select
              className="mb-10"
              label="Education Level"
              value={accompaniment[0].education_level}
              name="education_level"
              datas={educationLevel}
              handleChange={handleInputChange}
            />
            <Select
              className="mb-10"
              label="Written English Language Proficiency"
              value={accompaniment[0].english_written}
              datas={englishLevel}
              name="english_written"
              handleChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <>
          {getPfrLength?.length &&
            getPfrLength.map((data, index) => (
              <div key={index}>
                <h3 className="w-full mb-10 text-base font-bold text-green-deep">{clientIdentity(index)}</h3>
                
                <Input
                  className="mb-10"
                  label="Age"
                  type="text"
                  readonly
                  placeholder={`Below 62 ${index}`}
                  value={accompaniment[index] ? accompaniment[index].age == 0 ? "Below 62" : "62 or above" : ""}
                />
                <Select
                  className="mb-10"
                  label="Spoken English Language Proficiency"
                  value={accompaniment[index] ? accompaniment[index].english_spoken : ""}
                  name="english_spoken"
                  datas={englishLevel}
                  handleChange={handleInputChange}
                />
                <Select
                  className="mb-10"
                  label="Education Level"
                  value={accompaniment[index] ? accompaniment[index].education_level : ""}
                  name="education_level"
                  datas={educationLevel}
                  handleChange={handleInputChange}
                />
                <Select
                  className="mb-10"
                  label="Written English Language Proficiency"
                  value={accompaniment[index] ? accompaniment[index].english_written : ""}
                  datas={englishLevel}
                  name="english_written"
                  handleChange={handleInputChange}
                />
              </div>
            ))}
        </>
      )}
    </SectionCardDoubleGrid>
  );
};

export default Accompainment;
