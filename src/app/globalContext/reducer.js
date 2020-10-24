export const reducer = state => {
  return {
    //Only curry functions:::::
    setUser: data => ({user: data}),
    changeShowMenu: () => ({showMenu:!state.showMenu}),
    set: (key, value) => ({[key]: value}),
  };
};

export const initialState = () => {
  return {
    user: null,
    showMenu: false,
  };
};
