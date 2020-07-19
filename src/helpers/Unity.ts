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

export { ordinal_suffix_of };
