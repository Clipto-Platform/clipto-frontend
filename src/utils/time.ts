export const incrementDate = (date: any, i: number) => {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + i);
  return newDate
}

/**
 * 
 * @param start is the date when the request was made
 * @param deadline is the number of days after the request that this is due
 * @returns true if deadline is passed
 */
export const checkIfDeadlinePassed = (start: string, deadline: number): boolean => {
  return new Date() < incrementDate(start, deadline)
}


export const tests = () => {
  // increments date by 1
  const today = new Date()
  const tomorrow = incrementDate(new Date(today), 1)
  if (today.getTime() - tomorrow.getTime() !== -1000 * 60 * 60 * 24) {
    console.log(today.getTime() - tomorrow.getTime())
    throw 'tomorrow is not 24 hrs from today'
  }
  // returns false when deadline is passed
  const deadline = 3
  if (!checkIfDeadlinePassed(today, 1)) {
    console.error('the deadline is tomorrow! this should be true')
  }
  if (checkIfDeadlinePassed(today, -1)) {
    console.error('this should be false')
  }
}