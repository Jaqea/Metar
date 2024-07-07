import { home } from "api/modules";

const actions = {
  weatherNow(context) {
    home.location().then((res) => {
      context.commit("weatherNow", res);
    });
  },
  airNow(context) {
    home.airNow().then((res) => {
      context.commit("airNow", res);
    });
  },
  searchLive(context, payload) {
    home.searchAir(payload).then((res) => {
      context.commit("airNow", res);
    });
    home.searchCity(payload).then((res) => {
      context.commit("weatherNow", res);
    });
  },
  weatherDaily(context) {
    home.weatherDaily().then((res) => {
      context.commit("weatherDaily", res);
    });
  },
  weatherHourly(context) {
    home.weatherHourly().then((res) => {
      context.commit("weatherHourly", res);
    });
  },
  searchWeatherDaily(context, payload) {
    home.searchWeatherDaily(payload).then((res) => {
      context.commit("weatherDaily", res);
    });
  },
  searchWeatherHourly(context, payload) {
    home.searchWeatherHourly(payload).then((res) => {
      context.commit("weatherHourly", res);
    });
  },
  airDaily(context) {
    home.airDaily().then((res) => {
      context.commit("airDaily", res);
    });
  },
  airHourly(context) {
    home.airHourly().then((res) => {
      context.commit("airHourly", res);
    });
  },
  searchAirDaily(context, payload) {
    home.searchAirDaily(payload).then((res) => {
      context.commit("airDaily", res);
    });
  },
  searchAirHourly(context, payload) {
    home.searchAirHourly(payload).then((res) => {
      context.commit("airHourly", res);
    });
  },
  tideDaily(context) {
    home.tideDaily().then((res) => {
      context.commit("tideDaily", res);
    });
  },
  searchTideDaily(context, payload) {
    home.searchTideDaily(payload).then((res) => {
      context.commit("tideDaily", res);
    });
  },
  weatherAlarm(context) {
    home.weatherAlarm().then((res) => {
      context.commit("weatherAlarm", res);
    });
  },
  searchWeatherAlarm(context, payload) {
    home.searchWeatherAlarm(payload).then((res) => {
      context.commit("weatherAlarm", res);
    });
  },
  life(context) {
    home.life().then((res) => {
      context.commit("life", res);
    });
  },
  searchLife(context, payload) {
    home.searchLife(payload).then((res) => {
      context.commit("life", res);
    });
  },
  calendar(context) {
    home.calendar().then((res) => {
      context.commit("calendar", res);
    });
  },
  searchCalendar(context, payload) {
    home.searchCalendar(payload).then((res) => {
      context.commit("calendar", res);
    });
  },
  sun(context) {
    home.sun().then((res) => {
      context.commit("sun", res);
    });
  },
  searchSun(context, payload) {
    home.searchSun(payload).then((res) => {
      context.commit("sun", res);
    });
  },
  moon(context) {
    home.moon().then((res) => {
      context.commit("moon", res);
    });
  },
  searchMoon(context, payload) {
    home.searchMoon(payload).then((res) => {
      context.commit("moon", res);
    });
  },
  airRank(context) {
    home.airRank().then((res) => {
      context.commit("airRank", res);
    });
  },
  weatherVisuality(context) {
    home.weatherDaily().then((res) => {
      context.commit("weatherVisuality", res);
    });
  },
  searchWeatherVisuality(context, payload) {
    home.searchWeatherDaily(payload).then((res) => {
      context.commit("weatherVisuality", res);
    });
  },
  getHome(context) {
    home.getHome().then((res) => {
      context.commit("getHome", res.data);
      home.location().then((res1) => {
        context.commit("location", res1);
      });
    });
  },
  getAllUser(context) {
    home.getAllUser().then((res) => {
      context.commit("getAllUser", res.data);
    });
  },
  reviseUser(context, payload) {
    home.reviseUser(payload);
  },
  createUser(context, payload) {
    home.createUser(payload).then((res) => {
      res.data.imageUrl = payload.imageUrl;
      context.commit("createUser", res.data);
    });
  },
  deleteUser(context, payload) {
    home.deleteUser({ email: payload.email }).then(() => {
      context.commit("deleteUser", payload.index);
    });
  },
  findUser(context, payload) {
    home.findUser(payload).then((res) => {
      context.commit("findUser", res.data);
    });
  },
  createAccount(context) {
    home.createAccount().then((res) => {
      context.commit("createAccount", res.data);
    });
  },
  createData(context, payload) {
    home.createData(payload.newDataInfo).then((res) => {
      home
        .uploadData({
          id: res.data.newdataInfo._id,
          formData: payload.formData,
        })
        .then((result) => {
          const { url } = result.data;
          res.data.newdataInfo.url = url;
          context.commit("addDataList", {
            ...res.data.newdataInfo,
          });
        });
    });
  },
  deleteData(context, payload) {
    home.deleteData({ id: payload.id }).then(() => {
      context.commit("deleteData", payload.index);
    });
  },
  reviseData(context, payload) {
    home.reviseData(payload).then(() => {
      context.commit("reviseDataList", payload);
    });
  },
  findData(context, payload) {
    home.findData(payload).then((res) => {
      context.commit("findData", res.data);
    });
  },
  getAllData(context) {
    home.getAllData().then((res) => {
      context.commit("getAllData", res.data);
    });
  },
  uploadData(context, payload) {
    home.uploadData(payload).then((res) => {
      const { dataRevise } = payload;
      dataRevise.url = res.data.url;
      home.reviseData(dataRevise).then(() => {
        context.commit("reviseDataList", dataRevise);
      });
    });
  },
  createAnnounce(context, payload) {
    home.createAnnounce(payload);
  },
  deleteAnnounce(context, payload) {
    console.log({ id: payload.id });
    home.deleteAnnounce({ id: payload.id }).then(() => {
      context.commit("deleteAnnounce", payload.index);
    });
  },
  reviseAnnounce(context, payload) {
    home.reviseAnnounce(payload).then(() => {
      context.commit("reviseAnnounceList", payload);
    });
  },
  findAnnounce(context, payload) {
    home.findAnnounce(payload).then((res) => {
      context.commit("findAnnounce", res.data);
    });
  },
  getAllAnnounce(context) {
    home.getAllAnnounce().then((res) => {
      context.commit("getAllAnnounce", res.data);
    });
  },
  addDownload(context, payload) {
    home.addDownload(payload);
  },
  addWatchers(context, payload) {
    home.addWatchers(payload);
  },
  createUserData(context, payload) {
    home.createUserData(payload).then((res) => {
      context.commit("addUserDataList", {
        ...res.data.newUserDataInfo,
      });
    });
  },
  getAllUserData(context) {
    home.getAllUserData().then((res) => {
      context.commit("getAllUserData", res.data);
    });
  },
};

export default actions;
