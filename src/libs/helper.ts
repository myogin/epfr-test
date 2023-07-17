import moment from "moment";

export const dateFormat = (params: string) => {
  const yourDate = new Date(params);
  const NewDate = moment(yourDate, "DD-MM-YYYY");

  return NewDate;
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

export const getClientCustom = (clients: any) => {
  let clientCustom: any[] = [];

  if (clients?.length) {
    clients.map((data: any, index: any) => {
      clientCustom.push({ id: index, name: data.clientName });
    });
  }

  return clientCustom;
};

export const getLength = (params: any) => {
  let arr = [...Array(params)];
  return arr;
};

export const usdFormat = (currency: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(currency);
};
