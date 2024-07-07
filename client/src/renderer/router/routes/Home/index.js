import { auth } from "../../middleware";

function load(component) {
  return (resolve) => require([`views/${component}`], resolve);
}
const children = [
  {
    path: "/home",
    name: "Dashbord",
    component: load("Home/Dashbord"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherNow",
    name: "WeatherNow",
    component: load("Home/WeatherNow"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/predictWeather",
    name: "PredictWeather",
    component: load("Home/PredictWeather"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/predictAir",
    name: "PredictAir",
    component: load("Home/PredictAir"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/predictSea",
    name: "PredictSea",
    component: load("Home/PredictSea"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherAssess",
    name: "WeatherAssess",
    component: load("Home/WeatherAssess"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherDisaster",
    name: "WeatherDisaster",
    component: load("Home/WeatherDisaster"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherVisuality",
    name: "WeatherVisuality",
    component: load("Home/WeatherVisuality"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherLife",
    name: "WeatherLife",
    component: load("Home/WeatherLife"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherCalendar",
    name: "WeatherCalendar",
    component: load("Home/WeatherCalendar"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherSun",
    name: "WeatherSun",
    component: load("Home/WeatherSun"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/weatherMoon",
    name: "WeatherMoon",
    component: load("Home/WeatherMoon"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dataDetail",
    name: "DataDetail",
    component: load("Home/DataDetail"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/announcement",
    name: "Announcement",
    component: load("Home/Announcement"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/userInfo",
    name: "UserInfo",
    component: load("Home/UserInfo"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/userData",
    name: "UserData",
    component: load("Home/UserData"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/userDataDetail",
    name: "UserDataDetail",
    component: load("Home/UserDataDetail"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/userManage",
    name: "UserManage",
    component: load("Home/UserManage"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dataManage",
    name: "DataManage",
    component: load("Home/DataManage"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/announceManage",
    name: "AnnounceManage",
    component: load("Home/AnnounceManage"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/editorAnnounce",
    name: "EditorAnnounce",
    component: load("Home/EditorAnnounce"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/reviseAnnounce",
    name: "ReviseAnnounce",
    component: load("Home/ReviseAnnounce"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/announceDetail",
    name: "AnnounceDetail",
    component: load("Home/AnnounceDetail"),
    meta: {
      middleware: [auth],
    },
  },
];

export default children;
