import moment from "moment";

export const dateFormat = (params: string) => {
  const yourDate = new Date(params);
  const NewDate = moment(yourDate, "DD-MM-YYYY");

  return NewDate;
};

export const checkCountDataDependent = (datas: any) => {
  let data: number = 0;
  if (datas?.length) {
    if (datas[0].name === "" && datas[0].clientPfr === "") {
      data = datas.length;
    } else {
      data = datas.length + 1;
    }
  } else {
    data = datas.length + 1;
  }

  return data;
};

export const checkCountData = (datas: any) => {
  let data: number = 0;
  if (datas?.length) {
    if (datas[0].client === "") {
      data = datas.length;
    } else {
      data = datas.length + 1;
    }
  } else {
    data = datas.length + 1;
  }

  return data;
};

export const checkCountDataOther = (datas: any) => {
  let data: number = 0;
  if (datas?.length) {
    if (datas[0].key === "") {
      data = datas.length;
    } else {
      data = datas.length + 1;
    }
  } else {
    data = datas.length + 1;
  }

  return data;
};

export const getClientCustom = (clients: any) => {
  let clientCustom: any[] = [];

  if (clients?.length) {
    clients.map((data: any, index: any) => {
      if (data.clientName !== "") {
        clientCustom.push({ id: index, name: data.clientName });
      }
    });
  }

  return clientCustom;
};

export const getInsuredCustom = (clients: any, dependents: any) => {
  let clientCustom: any[] = [];

  if (clients?.length) {
    clients.map((data: any, indexClient: any) => {
      if (data.clientName !== "") {
        clientCustom.push({ id: indexClient, name: data.clientName });
      }
    });
  }

  if (dependents?.length) {
    dependents.map((data: any, indexDependent: any) => {
      if (data.name !== "") {
        clientCustom.push({
          id: indexDependent + clients.length,
          name: data.name,
        });
      }
    });
  }

  return clientCustom;
};

export const getLength = (params: any) => {
  let arr = [...Array(params)];
  return arr;
};

export const clientIdentity = (params: any) => {
  switch (params) {
    case 0:
      return "Client 1";
    case 1:
      return "Client 2";
    default:
      return "Client 1";
  }
};

export const answerYesNo = (params: any) => {
  switch (params) {
    case "1":
      return "Yes";
    case "2":
      return "No";
    default:
      return "No";
  }
};

export const usdFormat = (currency: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(currency);
};

export const sgdFormat = (currency: any) => {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(currency);
};

export const localToken = () => {
  let checkData = localStorage.getItem("login")
    ? localStorage.getItem("login")
    : null;
  let dataFix = null;
  if (checkData) {
    let data = JSON.parse(checkData);
    let check = data.state.token;

    if (check == null || check == undefined || check == "") {
      dataFix = null;
    } else {
      dataFix = check;
    }
  }

  return dataFix;
};

export const localOwnerId = () => {
  let checkData = localStorage.getItem("login")
    ? localStorage.getItem("login")
    : null;
  let dataFix = null;
  if (checkData) {
    let data = JSON.parse(checkData);
    let check = data.state.ownerId;

    if (check == null || check == undefined || check == "" || check == 0) {
      dataFix = null;
    } else {
      dataFix = check;
    }
  }

  return dataFix;
};

export const localPfrId = () => {
  let checkData = localStorage.getItem("login")
    ? localStorage.getItem("login")
    : null;
  let dataFix = null;
  if (checkData) {
    let data = JSON.parse(checkData);
    let check = data.state.pfrId;

    if (check == null || check == undefined || check == "" || check == 0) {
      dataFix = null;
    } else {
      dataFix = check;
    }
  }

  return dataFix;
};

export const localType = () => {
  let checkData = localStorage.getItem("login")
    ? localStorage.getItem("login")
    : null;
  let dataFix = null;
  if (checkData) {
    let data = JSON.parse(checkData);
    let check = data.state.typeEpfr;

    if (check == null || check == undefined || check == "" || check == 0) {
      dataFix = null;
    } else {
      dataFix = check;
    }
  }

  return dataFix;
};

export const flushLocalData = () => {
  localStorage.removeItem("section1");
  localStorage.removeItem("section2");
  localStorage.removeItem("section3");
  localStorage.removeItem("section4");
  localStorage.removeItem("section5");
  localStorage.removeItem("section6");
  localStorage.removeItem("section7");
  localStorage.removeItem("section8");
  localStorage.removeItem("section9");
  localStorage.removeItem("section10");
  localStorage.removeItem("section11");
  localStorage.removeItem("section12");
  localStorage.removeItem("section13");
  return true;
};
