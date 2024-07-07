const getters = {
  account: (state) => state.account,
  user: (state) => state.user,
  imageUrl: (state) => state.imageUrl,
  token: () => localStorage.getItem("token"),
  isLogin: () => localStorage.getItem("isLogin"),
};

export default getters;
