import serviceV3 from "@/utils/seniverse-v3";
import http from "@/utils/http";
import axios from "axios";
import { params } from "../base";

let IP;
axios.get("http://pv.sohu.com/cityjson?ie=utf-8").then((res) => {
  const ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
  IP = res.data.match(ipReg);
  console.log(IP[0]);
});
// console.log(IP);
const home = {
  location() {
    return serviceV3.get(`weather/now.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  airNow() {
    return serviceV3.get(`air/now.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchCity(city) {
    return serviceV3.get(`weather/now.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  searchAir(city) {
    return serviceV3.get(`air/now.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  weatherDaily() {
    return serviceV3.get(`weather/daily.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  weatherHourly() {
    return serviceV3.get(`weather/hourly.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchWeatherDaily(city) {
    return serviceV3.get(`weather/daily.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  searchWeatherHourly(city) {
    return serviceV3.get(`weather/hourly.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  airDaily() {
    return serviceV3.get(`air/daily.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  airHourly() {
    return serviceV3.get(`air/hourly.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchAirDaily(city) {
    return serviceV3.get(`air/daily.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  searchAirHourly(city) {
    return serviceV3.get(`air/hourly.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  tideDaily() {
    return serviceV3.get(`tide/daily.json?${params}&location=dandong&language=zh-Hans&unit=c`);
  },
  searchTideDaily(city) {
    return serviceV3.get(`tide/daily.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  weatherAlarm() {
    return serviceV3.get(`weather/alarm.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchWeatherAlarm(city) {
    return serviceV3.get(`weather/alarm.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  life() {
    return serviceV3.get(
      `life/suggestion.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`
    );
  },
  searchLife(city) {
    return serviceV3.get(`life/suggestion.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  calendar() {
    return serviceV3.get(
      `life/chinese_calendar.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`
    );
  },
  searchCalendar(city) {
    return serviceV3.get(
      `life/chinese_calendar.json?${params}&location=${city}&language=zh-Hans&unit=c`
    );
  },
  sun() {
    return serviceV3.get(`geo/sun.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchSun(city) {
    return serviceV3.get(`geo/sun.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  moon() {
    return serviceV3.get(`geo/moon.json?${params}&location=${IP[0]}&language=zh-Hans&unit=c`);
  },
  searchMoon(city) {
    return serviceV3.get(`geo/moon.json?${params}&location=${city}&language=zh-Hans&unit=c`);
  },
  airRank() {
    return serviceV3.get(`air/ranking.json?${params}&language=zh-Hans&unit=c`);
  },
  getHome() {
    return http.get("/home");
  },
  getAllUser() {
    return http.get("/allUser");
  },
  reviseUser(data) {
    return http.patch("/reviseUser", data);
  },
  createUser(data) {
    return http.post("/createUser", data);
  },
  deleteUser(data) {
    return http.post("/deleteUser", data);
  },
  findUser(nickName) {
    return http.get(`/findUser?nickName=${nickName}`);
  },
  createAccount() {
    return http.get("/createAccount");
  },
  getAllData() {
    return http.get("/allData");
  },
  createData(data) {
    return http.post("/createData", data);
  },
  deleteData(data) {
    return http.post("/deleteData", data);
  },
  reviseData(data) {
    return http.post("/reviseData", data);
  },
  findData(name) {
    return http.get(`/findData?name=${name}`);
  },
  uploadData(data) {
    return http({
      method: "post",
      url: "/uploadData",
      data: data.formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { id: data.id },
    });
  },
  getAllAnnounce() {
    return http.get("/allAnnounce");
  },
  createAnnounce(data) {
    return http.post("/createAnnounce", data);
  },
  deleteAnnounce(data) {
    return http.post("/deleteAnnounce", data);
  },
  reviseAnnounce(data) {
    return http.post("/reviseAnnounce", data);
  },
  findAnnounce(name) {
    return http.get(`/findAnnounce?name=${name}`);
  },
  addDownload(id) {
    return http.post("/addDownload", { id });
  },
  addWatchers(id) {
    return http.post("/addWatchers", { id });
  },
  createUserData(data) {
    return http.post("/createUserData", data);
  },
  getAllUserData() {
    const email = JSON.parse(localStorage.getItem("user")).email;
    return http.get(`/allUserData?email=${email}`);
  },
  // ...其它
};

export default home;
