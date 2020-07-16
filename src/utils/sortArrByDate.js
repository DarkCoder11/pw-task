import { orderBy } from 'lodash';
import moment from 'moment';

const sortArrByDate = (arr, date, type) =>
  orderBy(
    arr,
    (trans) => {
      return moment(new Date(trans[date]));
    },
    [type],
  );

export default sortArrByDate;
