import titleize from 'titleize';
import * as moment from 'moment';

export const rentalType = (isShared) => isShared ? 'shared' : 'entire'

export const toUpperCase = value => value ? titleize(value) : ''

export const getRangeOfDates = (startAt, endAt, dateFormate = 'Y/MM/DD') => {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStart = moment(startAt);

    while (mStart < mEndAt) {
        tempDates.push(mStart.format(dateFormate));
        mStart = mStart.add(1, 'day');
    }

    tempDates.push(mEndAt.format(dateFormate));

    return tempDates;
}