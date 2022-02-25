import * as moment from 'moment';

export const isRequestExpired = (created: string, deadline: number): boolean => {
  const currentDate = moment().utc();
  const deadlineDate = moment(created).add(deadline, 'days');
  return currentDate.isSameOrAfter(deadlineDate);
};

export const deadlineMessage = (created: string, deadline: number): string => {
  if (isRequestExpired(created, deadline)) return 'Expired';
  return moment(created).add(deadline, 'days').fromNow();
};
