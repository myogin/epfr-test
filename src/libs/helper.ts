import moment from 'moment'

export const dateFormat = (params: string) => {
    const yourDate = new Date(params)
    const NewDate = moment(yourDate, 'DD-MM-YYYY')

    return NewDate;
};
