import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: any;
  name?: string;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  indexClient?: number;
  dataType?: string;
  indexData?: number;
  intro?: string;
  needValidation?: boolean;
  logic?: boolean;
  textError?: string;
  disabled?: boolean;
}

const SelectNationality = (props: Props) => {
  let nationalityList: Array<any> = [
    { id: "Singaporean", name: "Singaporean" },
    { id: "Afghan", name: "Afghan" },
    { id: "Albanian", name: "Albanian" },
    { id: "Algerian", name: "Algerian" },
    { id: "American", name: "American" },
    { id: "Andorran", name: "Andorran" },
    { id: "Angolan", name: "Angolan" },
    { id: "Antiguans", name: "Antiguans" },
    { id: "Argentinean", name: "Argentinean" },
    { id: "Armenian", name: "Armenian" },
    { id: "Australian", name: "Australian" },
    { id: "Austrian", name: "Austrian" },
    { id: "Azerbaijani", name: "Azerbaijani" },
    { id: "Bahamian", name: "Bahamian" },
    { id: "Bahraini", name: "Bahraini" },
    { id: "Bangladeshi", name: "Bangladeshi" },
    { id: "Barbadian", name: "Barbadian" },
    { id: "Batswana", name: "Batswana" },
    { id: "Belarusian", name: "Belarusian" },
    { id: "Belgian", name: "Belgian" },
    { id: "Belizian", name: "Belizian" },
    { id: "Beninese", name: "Beninese" },
    { id: "Bhutanese", name: "Bhutanese" },
    { id: "Bolivian", name: "Bolivian" },
    { id: "Bosnian", name: "Bosnian" },
    { id: "Brazilian", name: "Brazilian" },
    { id: "British", name: "British" },
    { id: "Bruneian", name: "Bruneian" },
    { id: "Bulgarian", name: "Bulgarian" },
    { id: "Burkinese", name: "Burkinese" },
    { id: "Burmese", name: "Burmese" },
    { id: "Burundian", name: "Burundian" },
    { id: "Cambodian", name: "Cambodian" },
    { id: "Cameroonian", name: "Cameroonian" },
    { id: "Canadian", name: "Canadian" },
    { id: "Cape Verdean", name: "Cape Verdean" },
    { id: "Central African", name: "Central African" },
    { id: "Chadian", name: "Chadian" },
    { id: "Chilean", name: "Chilean" },
    { id: "Chinese", name: "Chinese" },
    { id: "Colombian", name: "Colombian" },
    { id: "Comoran", name: "Comoran" },
    { id: "Congolese", name: "Congolese" },
    { id: "Costa Rican", name: "Costa Rican" },
    { id: "Croatian", name: "Croatian" },
    { id: "Cuban", name: "Cuban" },
    { id: "Cypriot", name: "Cypriot" },
    { id: "Czech", name: "Czech" },
    { id: "Danish", name: "Danish" },
    { id: "Djibouti", name: "Djibouti" },
    { id: "Dominican", name: "Dominican" },
    { id: "Dutch", name: "Dutch" },
    { id: "East Timorese", name: "East Timorese" },
    { id: "Ecuadorean", name: "Ecuadorean" },
    { id: "Egyptian", name: "Egyptian" },
    { id: "Equatorial Guinean", name: "Equatorial Guinean" },
    { id: "Eritrean", name: "Eritrean" },
    { id: "Estonian", name: "Estonian" },
    { id: "Ethiopian", name: "Ethiopian" },
    { id: "Fijian", name: "Fijian" },
    { id: "Filipino", name: "Filipino" },
    { id: "Finnish", name: "Finnish" },
    { id: "French", name: "French" },
    { id: "Gabonese", name: "Gabonese" },
    { id: "Gambian", name: "Gambian" },
    { id: "Georgian", name: "Georgian" },
    { id: "German", name: "German" },
    { id: "Ghanaian", name: "Ghanaian" },
    { id: "Greek", name: "Greek" },
    { id: "Grenadian", name: "Grenadian" },
    { id: "Guatemalan", name: "Guatemalan" },
    { id: "Guinea-Bissauan", name: "Guinea-Bissauan" },
    { id: "Guinean", name: "Guinean" },
    { id: "Guyanese", name: "Guyanese" },
    { id: "Haitian", name: "Haitian" },
    { id: "Herzegovinian", name: "Herzegovinian" },
    { id: "Honduran", name: "Honduran" },
    { id: "Hungarian", name: "Hungarian" },
    { id: "Icelander", name: "Icelander" },
    { id: "Indian", name: "Indian" },
    { id: "Indonesian", name: "Indonesian" },
    { id: "Iranian", name: "Iranian" },
    { id: "Iraqi", name: "Iraqi" },
    { id: "Irish", name: "Irish" },
    { id: "Israeli", name: "Israeli" },
    { id: "Italian", name: "Italian" },
    { id: "Ivorian", name: "Ivorian" },
    { id: "Jamaican", name: "Jamaican" },
    { id: "Japanese", name: "Japanese" },
    { id: "Jordanian", name: "Jordanian" },
    { id: "Kazakh", name: "Kazakh" },
    { id: "Kenyan", name: "Kenyan" },
    { id: "Kittian and Nevisian", name: "Kittian and Nevisian" },
    { id: "Kuwaiti", name: "Kuwaiti" },
    { id: "Kyrgyz", name: "Kyrgyz" },
    { id: "Laotian", name: "Laotian" },
    { id: "Latvian", name: "Latvian" },
    { id: "Lebanese", name: "Lebanese" },
    { id: "Liberian", name: "Liberian" },
    { id: "Libyan", name: "Libyan" },
    { id: "Liechtensteiner", name: "Liechtensteiner" },
    { id: "Lithuanian", name: "Lithuanian" },
    { id: "Luxembourger", name: "Luxembourger" },
    { id: "Macedonian", name: "Macedonian" },
    { id: "Malagasy", name: "Malagasy" },
    { id: "Malawian", name: "Malawian" },
    { id: "Malaysian", name: "Malaysian" },
    { id: "Maldivan", name: "Maldivan" },
    { id: "Malian", name: "Malian" },
    { id: "Maltese", name: "Maltese" },
    { id: "Marshallese", name: "Marshallese" },
    { id: "Mauritanian", name: "Mauritanian" },
    { id: "Mauritian", name: "Mauritian" },
    { id: "Mexican", name: "Mexican" },
    { id: "Micronesian", name: "Micronesian" },
    { id: "Moldovan", name: "Moldovan" },
    { id: "Monacan", name: "Monacan" },
    { id: "Mongolian", name: "Mongolian" },
    { id: "Moroccan", name: "Moroccan" },
    { id: "Mosotho", name: "Mosotho" },
    { id: "Motswana", name: "Motswana" },
    { id: "Mozambican", name: "Mozambican" },
    { id: "Namibian", name: "Namibian" },
    { id: "Nauruan", name: "Nauruan" },
    { id: "Nepalese", name: "Nepalese" },
    { id: "New Zealander", name: "New Zealander" },
    { id: "Ni-vanuatu", name: "Ni-Vanuatu" },
    { id: "Nicaraguan", name: "Nicaraguan" },
    { id: "Nigerien", name: "Nigerien" },
    { id: "North Korean", name: "North Korean" },
    { id: "Northern Irish", name: "Northern Irish" },
    { id: "Norwegian", name: "Norwegian" },
    { id: "Omani", name: "Omani" },
    { id: "Pakistani", name: "Pakistani" },
    { id: "Palauan", name: "Palauan" },
    { id: "Panamanian", name: "Panamanian" },
    { id: "Papua New Guinean", name: "Papua New Guinean" },
    { id: "Paraguayan", name: "Paraguayan" },
    { id: "Peruvian", name: "Peruvian" },
    { id: "Polish", name: "Polish" },
    { id: "Portuguese", name: "Portuguese" },
    { id: "Qatari", name: "Qatari" },
    { id: "Romanian", name: "Romanian" },
    { id: "Russian", name: "Russian" },
    { id: "Rwandan", name: "Rwandan" },
    { id: "Saint Lucian", name: "Saint Lucian" },
    { id: "Salvadoran", name: "Salvadoran" },
    { id: "Samoan", name: "Samoan" },
    { id: "Sao Tomean", name: "Sao Tomean" },
    { id: "Saudi", name: "Saudi" },
    { id: "Scottish", name: "Scottish" },
    { id: "Senegalese", name: "Senegalese" },
    { id: "Serbian", name: "Serbian" },
    { id: "Seychellois", name: "Seychellois" },
    { id: "Sierra Leonian", name: "Sierra Leonian" },
    { id: "Slovakian", name: "Slovakian" },
    { id: "Slovenian", name: "Slovenian" },
    { id: "Solomon Islander", name: "Solomon Islander" },
    { id: "Somali", name: "Somali" },
    { id: "South African", name: "South African" },
    { id: "South Korean", name: "South Korean" },
    { id: "Spanish", name: "Spanish" },
    { id: "Sri Lankan", name: "Sri Lankan" },
    { id: "Sudanese", name: "Sudanese" },
    { id: "Surinamer", name: "Surinamer" },
    { id: "Swazi", name: "Swazi" },
    { id: "Swedish", name: "Swedish" },
    { id: "Swiss", name: "Swiss" },
    { id: "Syrian", name: "Syrian" },
    { id: "Taiwanese", name: "Taiwanese" },
    { id: "Tajik", name: "Tajik" },
    { id: "Tanzanian", name: "Tanzanian" },
    { id: "Thai", name: "Thai" },
    { id: "Togolese", name: "Togolese" },
    { id: "Tongan", name: "Tongan" },
    { id: "Trinidadian or Tobagonian", name: "Trinidadian or Tobagonian" },
    { id: "Tunisian", name: "Tunisian" },
    { id: "Turkish", name: "Turkish" },
    { id: "Tuvaluan", name: "Tuvaluan" },
    { id: "Ugandan", name: "Ugandan" },
    { id: "Ukrainian", name: "Ukrainian" },
    { id: "Uruguayan", name: "Uruguayan" },
    { id: "Uzbek", name: "Uzbek" },
    { id: "Venezuelan", name: "Venezuelan" },
    { id: "Vietnamese", name: "Vietnamese" },
    { id: "Welsh", name: "Welsh" },
    { id: "Yemenite", name: "Yemenite" },
    { id: "Zambian", name: "Zambian" },
    { id: "Zimbabwean", name: "Zimbabwean" },
  ];

  return (
    <div className={`w-full ${props.className} space-y-3`}>
      {props.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {props.label}
        </label>
      ) : (
        ""
      )}
      <select
        data-indexclient={props.indexClient}
        data-groupdata={props.dataType}
        data-indexdata={props.indexData}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
      >
        <option value="-">{props.intro ? props.intro : "Select"}</option>
        {nationalityList.length > 0 &&
          nationalityList.map((data, index) => (
            <option key={"dasas" + index} value={data.id}>
              {data.name}
            </option>
          ))}
      </select>

      {/* Error Validation */}
      {props.needValidation && !props.logic ? (
        <div className="w-full text-xs text-left text-red">
          {props.textError ? props.textError : "Required"}
        </div>
      ) : null}
    </div>
  );
};

export default SelectNationality;
