import moment from 'moment';

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

const getDifferenceTwoDate = (date1: string, date2: string) => {
  const firstDate = moment(date1, 'YYYY-MM-DD'); //Create date using string-format constructor
  const secondDate = moment(date2, 'YYYY-MM-DD');

  const duration = moment.duration(secondDate.diff(firstDate));
  const years = duration.asYears();
  if (Math.round(years) < 1) {
    return '';
  }
  if (Math.round(years) > 1) {
    return `• ${Math.round(years)} years`;
  }
  return ` • ${Math.round(years)} year`;
};
export {
  ordinal_suffix_of,
  generateNewNameImage,
  dataUrlFile,
  getDifferenceTwoDate,
};
