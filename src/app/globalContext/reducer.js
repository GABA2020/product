export const reducer = state => {
  return {
    //Only curry functions:::::
    setUser: data => ({user: data}),
    changeShowMenu: (data) => ({showMenu:data}),
    set: (key, value) => ({[key]: value}),
  };
};

export const initialState = () => {
  return {
    user: null,
    showMenu: false,
  };
};
