import moment from 'moment';
const MonthYearFormat = 'MMM yyyy';
const DayMonthYearFormat = 'MMM DD, yyyy';
const YearFormat = 'yyyy';

const ordinal_suffix_of = (i: number) => {
  switch (i) {
    case 1:
      return `${i}st`;
    case 2:
      return `${i}nd`;
    case 3:
      return `${i}rd`;
    default:
      return `${i}th`;
  }
};
const generateNewNameImage = () => {
  return `${`${Math.floor(Math.random() * 99999999999999)}-${Math.floor(
    Math.random() * 99999999999999,
  )}-${Math.floor(Math.random() * 99999999999999)}`}.png`;
};

const dataUrlFile = (dataUrl, filename) => {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const getDifferenceMonthYear = (second1: number, second2: number) => {
  const firstDate = moment(moment.unix(second1).format('YYYY/MM/DD'));
  const secondDate = moment(moment.unix(second2).format('YYYY/MM/DD'));

  const duration = moment.duration(secondDate.diff(firstDate));
  const years = Math.round(duration.asYears());
  const months = Math.round(secondDate.diff(firstDate, 'M', true));
  let text = ``;
  if (years === 0 && months === 0) {
    return text;
  }
  if (years === 1) {
    text = `• 1 year`;
  }
  if (years > 1) {
    text = `• ${years} years `;
  }
  if (months === 1) {
    text = `${text} 1 month`;
  }
  if (months > 1) {
    text = `${text} ${months} months`;
  }
  return text;
};
const getDifferenceYear = (second1: number, second2: number) => {
  const firstDate = moment(moment.unix(second1).format('YYYY-MM-DD'));
  const secondDate = moment(moment.unix(second2).format('YYYY-MM-DD'));

  const duration = moment.duration(secondDate.diff(firstDate));
  const years = duration.asYears() - 1;
  if (Math.round(years) < 1) {
    return '';
  }
  if (Math.round(years) > 1) {
    return `• ${Math.round(years)} years`;
  }
  return ` • ${Math.round(years)} year`;
};

const convertDateToTimestamp = (date: string) => {
  const timestamp = moment(date).format('X');
  return parseInt(timestamp);
};
export {
  ordinal_suffix_of,
  generateNewNameImage,
  dataUrlFile,
  getDifferenceMonthYear,
  getDifferenceYear,
  convertDateToTimestamp,
  MonthYearFormat,
  DayMonthYearFormat,
  YearFormat,
};
