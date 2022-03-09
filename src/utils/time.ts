import moment from 'moment';

export const isRequestExpired = (created: number, deadline: number): boolean => {
  const currentDate = moment().utc();
  const deadlineDate = moment.unix(created).add(deadline, 'days');
  return currentDate.isSameOrAfter(deadlineDate);
};

export const deadlineMessage = (created: number, deadline: number): string => {
  if (isRequestExpired(created, deadline)) return 'Expired';
  return moment.unix(created).add(deadline, 'days').fromNow();
};
