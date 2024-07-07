import downloadFile from "utils/download";

function deepClone(target) {
  if (typeof target === "object" && target) {
    const cloneObj = {};
    Object.keys(target).forEach((key) => {
      const val = target[key];
      if (typeof val === "object" && val) {
        cloneObj[key] = deepClone(val); // 是对象就再次调用该函数递归
      } else {
        cloneObj[key] = val; // 基本类型的话直接复制值
      }
    });
    return cloneObj;
  }
  return target;
}
const mutations = {
  location(state, payload) {
    const data = payload.data.results[0];
    state.locationInfo.name = data.location.name;
    state.locationInfo.text = data.now.text;
    state.locationInfo.temperature = data.now.temperature;
  },
  weatherNow(state, payload) {
    const data = payload.data.results[0];
    state.now.name = data.location.name;
    state.now.text = data.now.text;
    state.now.code = `../../../static/weather-icons/${data.now.code}@2x.png`;
    state.now.temperature = data.now.temperature;
    state.now.clouds = data.now.clouds;
    state.now.dew_point = data.now.dew_point;
    state.now.feels_like = data.now.feels_like;
    state.now.humidity = data.now.humidity;
    state.now.pressure = data.now.pressure;
    state.now.visibility = data.now.visibility;
    state.now.wind_direction = data.now.wind_direction;
    state.now.wind_direction_degree = data.now.wind_direction_degree;
    state.now.wind_direction_degree = data.now.wind_direction_degree;
    state.now.wind_scale = data.now.wind_scale;
    state.now.wind_speed = data.now.wind_speed;
    state.now.last_update = data.last_update;
  },
  airNow(state, payload) {
    const data = payload.data.results[0];
    state.city.aqi = data.air.city.aqi;
    state.city.pm25 = data.air.city.pm25;
    state.city.pm10 = data.air.city.pm10;
    state.city.so2 = data.air.city.so2;
    state.city.no2 = data.air.city.no2;
    state.city.o3 = data.air.city.o3;
    state.city.co = data.air.city.co;
    state.city.primary_pollutant = data.air.city.primary_pollutant
      ? data.air.city.primary_pollutant
      : "无";
    state.city.quality = data.air.city.quality;
    state.city.last_update = data.last_update;
    if (state.city.aqi >= 0 && state.city.aqi <= 50) {
      state.city.innerClass = "inner excellent";
      state.city.airClass = "air excellent";
      state.city.color = "#35f064";
    } else if (state.city.aqi >= 51 && state.city.aqi <= 100) {
      state.city.innerClass = "inner good";
      state.city.airClass = "air good";
      state.city.color = "#f0cc35";
    } else if (state.city.aqi >= 101) {
      state.city.innerClass = "inner poor";
      state.city.airClass = "air poor";
      state.city.color = "#f04b35";
    }
  },
  isMax(state, payload) {
    state.isMax = payload;
  },
  weatherDaily(state, payload) {
    const data = payload.data.results[0].daily;
    state.weatherDaily = [];
    const low = [];
    const high = [];
    const dates = [];
    data.forEach((item, index) => {
      low[index] = item.low - 0;
      high[index] = item.high - 0;
      dates[index] = item.date;
      const weather = {};
      weather.date = item.date;
      weather.low = item.low;
      weather.high = item.high;
      weather.name = payload.data.results[0].location.name;
      weather.humidity = item.humidity;
      weather.text_day = item.text_day;
      weather.text_night = item.text_night;
      weather.wind_direction =
        item.wind_direction.length < 5 ? `${item.wind_direction}风` : item.wind_direction;
      weather.wind_scale = item.wind_scale;
      weather.wind_speed = item.wind_speed;
      weather.code_day = `../../../static/weather-icons/${item.code_day}@1x.png`;
      weather.code_night = `../../../static/weather-icons/${item.code_night}@1x.png`;
      weather.rainfall = item.rainfall;
      weather.precip = item.precip;
      weather.last_update = payload.data.results[0].last_update;
      state.weatherDaily[index] = weather;
    });
    state.options.title.text = `${state.weatherDaily[0].name}15日最高最低气温变化`;
    state.options.xAxis.categories = dates;
    state.series = [
      {
        name: "最高气温",
        type: "line",
        data: high,
      },
      {
        name: "最低气温",
        type: "line",
        data: low,
      },
    ];
  },
  weatherHourly(state, payload) {
    const data = payload.data.results[0].hourly;
    state.hourly1 = [];
    state.hourly2 = [];
    for (let i = 0; i < 12; i++) {
      const hour = {};
      hour.code = `../../../static/weather-icons/${data[i].code}@1x.png`;
      hour.humidity = data[i].humidity;
      hour.temperature = data[i].temperature;
      hour.text = data[i].text;
      hour.time = data[i].time.slice(11, 16) === "00:00" ? "明天" : data[i].time.slice(11, 16);
      hour.wind_direction =
        data[i].wind_direction.length < 5 ? `${data[i].wind_direction}风` : data[i].wind_direction;
      hour.wind_speed = data[i].wind_speed;
      state.hourly1[i] = hour;
    }
    for (let i = 12; i < 24; i++) {
      const hour = {};
      hour.code = `../../../static/weather-icons/${data[i].code}@1x.png`;
      hour.humidity = data[i].humidity;
      hour.temperature = data[i].temperature;
      hour.text = data[i].text;
      hour.time = data[i].time.slice(11, 16) === "00:00" ? "明天" : data[i].time.slice(11, 16);
      hour.wind_direction =
        data[i].wind_direction.length < 5 ? `${data[i].wind_direction}风` : data[i].wind_direction;
      hour.wind_speed = data[i].wind_speed;
      state.hourly2[i - 12] = hour;
    }
  },
  airHourly(state, payload) {
    const data = payload.data.results[0].hourly;
    state.airHourly = data;
    state.airHourly.forEach((item, index) => {
      state.airHourly[index].time = `${item.time.slice(0, 10)} ${item.time.slice(11, 16)}`;
    });
  },
  airDaily(state, payload) {
    const data = payload.data.results[0].daily;
    state.airDaily = data;
    state.airSearchName = payload.data.results[0].location.name;
  },
  tideDaily(state, payload) {
    const data = payload.data.results[0];
    state.tide.last_update = `${data.last_update.slice(0, 10)} ${data.last_update.slice(11, 19)}`;
    state.tide.name =
      data.location.path.split(",").length === 2
        ? `${data.location.path.split(",")[1]}省，${data.location.name}市`
        : `${data.location.name}市`;
    state.tideOptions.title.text = `${
      state.tide.name + data.ports[0].port.name + data.ports[0].data[0].date
    }潮汐高度变化`;
    state.tideOptions.xAxis.categories = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
      "24:00",
    ];
    for (let i = 0; i < data.ports.length; i++) {
      for (let j = 0; j < data.ports[i].data.length; j++) {
        for (let k = 0; k < data.ports[i].data[j].tide.length; k++) {
          data.ports[i].data[j].tide[k] = parseFloat(data.ports[i].data[j].tide[k]);
        }
        data.ports[i].data[j].range.forEach((item, index) => {
          data.ports[i].data[j].range[index].time = `${item.time.slice(0, 10)} ${item.time.slice(
            11,
            19
          )}`;
          if (data.ports[i].data[j].range[index].type === "high")
            data.ports[i].data[j].range[index].type = "高潮";
          else data.ports[i].data[j].range[index].type = "低潮";
        });
      }
    }
    state.tide.ports = [...data.ports];
    state.tideSeries = [
      {
        name: "24小时潮汐高度",
        type: "spline",
        data: data.ports[0].data[0].tide,
      },
    ];
    state.portAgain = deepClone(state.tide.ports);
  },
  tideSeriesChange(state, payload) {
    state.tideSeries = [];
    console.log(state.portAgain[payload.portIndex].data[payload.date].tide);
    const data = [];
    Object.keys(state.portAgain[payload.portIndex].data[payload.date].tide).forEach((key) => {
      data[key] = state.portAgain[payload.portIndex].data[payload.date].tide[key];
    });
    state.tideSeries = [
      {
        data,
        name: "24小时潮汐高度",
        type: "spline",
      },
    ];
  },
  weatherAlarm(state, payload) {
    const data = payload.data.results[0];
    state.alarm.alarms = data.alarms;
    state.alarm.name = data.location.name;
    state.alarm.isEmpty = data.alarms.length === 0;
    state.alarm.alarms.forEach((item, index) => {
      state.alarm.alarms[index].pub_date = `${item.pub_date.slice(0, 10)} ${item.pub_date.slice(
        11,
        19
      )}`;
      switch (item.level) {
        case "黄色":
          state.alarm.alarms[index].level = "yellow";
          state.alarm.alarms[index].tag = "warning";
          break;
        case "蓝色":
          state.alarm.alarms[index].level = "blue";
          state.alarm.alarms[index].tag = "";
          break;
        case "橙色":
          state.alarm.alarms[index].level = "orange";
          state.alarm.alarms[index].tag = "warning";
          break;
        case "红色":
          state.alarm.alarms[index].level = "red";
          state.alarm.alarms[index].tag = "danger";
          break;
        default:
          break;
      }
    });
  },
  life(state, payload) {
    const data = payload.data.results[0];
    state.life.last_update = data.last_update;
    state.life.name = data.location.name;
    const { suggestion } = data;
    suggestion.ac.name = "空调开启";
    suggestion.air_pollution.name = "空气污染扩散条件";
    suggestion.airing.name = "晾晒";
    suggestion.allergy.name = "过敏";
    suggestion.beer.name = "啤酒";
    suggestion.boating.name = "划船";
    suggestion.car_washing.name = "洗车";
    suggestion.chill.name = "风寒";
    suggestion.comfort.name = "舒适度";
    suggestion.dating.name = "约会";
    suggestion.dressing.name = "穿衣";
    suggestion.fishing.name = "钓鱼";
    suggestion.flu.name = "感冒";
    suggestion.hair_dressing.name = "美发";
    suggestion.kiteflying.name = "放风筝";
    suggestion.makeup.name = "化妆";
    suggestion.mood.name = "心情";
    suggestion.morning_sport.name = "晨练";
    suggestion.night_life.name = "夜生活";
    suggestion.road_condition.name = "路况";
    suggestion.shopping.name = "购物";
    suggestion.sport.name = "运动";
    suggestion.sunscreen.name = "防晒";
    suggestion.traffic.name = "交通";
    suggestion.travel.name = "旅游";
    suggestion.umbrella.name = "雨伞";
    suggestion.uv.name = "紫外线";
    suggestion.ac.img = "../../../static/img/ac.png";
    suggestion.air_pollution.img = "../../../static/img/air_pollution.png";
    suggestion.airing.img = "../../../static/img/airing.png";
    suggestion.allergy.img = "../../../static/img/allergy.png";
    suggestion.beer.img = "../../../static/img/beer.png";
    suggestion.boating.img = "../../../static/img/boating.png";
    suggestion.car_washing.img = "../../../static/img/car_washing.png";
    suggestion.chill.img = "../../../static/img/chill.png";
    suggestion.comfort.img = "../../../static/img/comfort.png";
    suggestion.dating.img = "../../../static/img/dating.png";
    suggestion.dressing.img = "../../../static/img/dressing.png";
    suggestion.fishing.img = "../../../static/img/fishing.png";
    suggestion.flu.img = "../../../static/img/flu.png";
    suggestion.hair_dressing.img = "../../../static/img/hair_dressing.png";
    suggestion.kiteflying.img = "../../../static/img/kiteflying.png";
    suggestion.makeup.img = "../../../static/img/makeup.png";
    suggestion.mood.img = "../../../static/img/mood.png";
    suggestion.morning_sport.img = "../../../static/img/morning_sport.png";
    suggestion.night_life.img = "../../../static/img/night_life.png";
    suggestion.road_condition.img = "../../../static/img/road_condition.png";
    suggestion.shopping.img = "../../../static/img/shopping.png";
    suggestion.sport.img = "../../../static/img/sport.png";
    suggestion.sunscreen.img = "../../../static/img/sunscreen.png";
    suggestion.traffic.img = "../../../static/img/traffic.png";
    suggestion.travel.img = "../../../static/img/travel.png";
    suggestion.umbrella.img = "../../../static/img/umbrella.png";
    suggestion.uv.img = "../../../static/img/uv.png";
    state.life.suggestion = suggestion;
  },
  calendar(state, payload) {
    const data = payload.data.results;
    const calendar = data.chinese_calendar;
    calendar.forEach((item, index) => {
      const year = item.date.split("-")[0];
      const month =
        item.date.split("-")[1][0] === "0" ? item.date.split("-")[1][1] : item.date.split("-")[0];
      const day =
        item.date.split("-")[2][0] === "0" ? item.date.split("-")[2][1] : item.date.split("-")[2];
      calendar[index].date = `${year}年${month}月${day}日`;
    });
    state.calendar = calendar;
  },
  sun(state, payload) {
    const data = payload.data.results[0];
    state.sun.name = data.location.name;
    state.sun.suns = data.sun;
  },
  moon(state, payload) {
    const data = payload.data.results[0];
    state.moon.name = data.location.name;
    state.moon.moons = data.moon;
  },
  airRank(state, payload) {
    const data = payload.data.results;
    let obj;
    const arr = [];
    data.forEach((item) => {
      obj = {
        name: item.location.name,
        // eslint-disable-next-line radix
        value: parseInt(item.aqi),
      };
      arr.push(obj);
    });
    state.airRank = arr;
  },
  weatherVisuality(state, payload) {
    const data = payload.data.results[0].daily;
    const optionDate = [];
    const optionTemperature = [];
    const optionRainfall = [];
    const option1Precip = [];
    const option2Humidity = [];
    data.forEach((item, index) => {
      optionDate[index] = item.date.slice(5);
      optionTemperature[index] = (parseFloat(item.code_day) + parseFloat(item.code_night)) / 2;
      optionRainfall[index] = parseFloat(item.rainfall);
      option1Precip[index] = parseFloat(item.precip);
      option2Humidity[index] = parseFloat(item.humidity);
    });
    state.option.name = payload.data.results[0].location.name;
    state.option.year = data[0].date.slice(0, 4);
    state.series1 = [
      {
        name: "降水量",
        data: optionRainfall,
        type: "bar",
        gradient: {
          color: ["#37a2da", "#67e0e3"],
        },
        label: {
          show: true,
        },
        animationCurve: "easeOutBounce",
      },
      {
        name: "气温",
        data: optionTemperature,
        type: "line",
        yAxisIndex: 1,
        label: {
          show: true,
        },
        animationCurve: "easeOutBounce",
      },
    ];
    state.series2 = [
      {
        data: option1Precip,
        type: "line",
        label: {
          show: true,
        },
        lineArea: {
          show: true,
          gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
        },
      },
    ];
    state.series3 = [
      {
        name: "降水量",
        data: optionRainfall,
        type: "line",
        smooth: true,
        lineArea: {
          show: true,
          gradient: ["rgba(251, 114, 147, 1)", "rgba(251, 114, 147, 0)"],
        },
        lineStyle: {
          stroke: "rgba(251, 114, 147, 1)",
          lineDash: [3, 3],
        },
        linePoint: {
          style: {
            stroke: "rgba(251, 114, 147, 1)",
          },
        },
        label: {
          show: true,
        },
      },
      {
        name: "相对湿度",
        data: option2Humidity,
        type: "bar",
        gradient: {
          color: ["rgba(103, 224, 227, .6)", "rgba(103, 224, 227, .1)"],
        },
        label: {
          show: true,
        },
        barStyle: {
          stroke: "rgba(103, 224, 227, 1)",
        },
        yAxisIndex: 1,
      },
    ];
    state.optionDate = optionDate;
  },
  getHome(state, payload) {
    state.dashbordList = payload.data.dashbordList;
    state.option3.title.text = `Matar平台气象信息变化趋势-${payload.data.years}年`;
    state.option3.xAxis.categories = payload.data.categories;
    state.option3.series = payload.data.series;
    state.title3 = `Matar平台气象信息变化趋势-${payload.data.years}年`;
    state.series4 = payload.data.series;
    state.categories = payload.data.categories;
    state.imgList = payload.data.imgList;
  },
  getAllUser(state, payload) {
    const { userList } = payload;
    userList.forEach((item, index) => {
      userList[index].id = index + 1;
    });
    state.userList = userList;
  },
  createUser(state, payload) {
    payload.res.id = state.userList.length + 1;
    if (payload.imageUrl) payload.res.imageUrl = payload.imageUrl;
    state.userList.push(payload.res);
  },
  deleteUser(state, payload) {
    state.userList.splice(payload, 1);
  },
  findUser(state, payload) {
    const { userList } = payload;
    userList.forEach((item, index) => {
      userList[index].id = index + 1;
    });
    state.userList = userList;
  },
  reviseUserList(state, payload) {
    const userList = [...state.userList];
    userList[payload.id - 1] = { ...payload };
    state.userList = userList;
  },
  createAccount(state, payload) {
    state.createAccount = payload.account;
  },
  emptyAccount(state) {
    state.createAccount = "";
  },
  findData(state, payload) {
    const { dataList } = payload;
    dataList.forEach((item, index) => {
      dataList[index].id = index + 1;
    });
    state.dataList = dataList;
  },
  deleteData(state, payload) {
    state.dataList.splice(payload, 1);
  },
  getAllData(state, payload) {
    const { dataList } = payload;
    dataList.forEach((item, index) => {
      dataList[index].id = index + 1;
    });
    state.dataList = dataList;
  },
  reviseDataList(state, payload) {
    const dataList = [...state.dataList];
    dataList[payload.id - 1] = { ...payload };
    state.dataList = dataList;
  },
  addDataList(state, payload) {
    const dataList = [...state.dataList];
    payload.id = dataList.length + 1;
    state.dataList.push(payload);
  },

  findAnnounce(state, payload) {
    const { announceList } = payload;
    announceList.forEach((item, index) => {
      announceList[index].id = index + 1;
    });
    state.announceList = announceList;
  },
  deleteAnnounce(state, payload) {
    state.announceList.splice(payload, 1);
  },
  getAllAnnounce(state, payload) {
    const { announceList } = payload;
    announceList.forEach((item, index) => {
      announceList[index].id = index + 1;
    });
    state.announceList = announceList;
  },
  reviseAnnounceList(state, payload) {
    const announceList = [...state.announceList];
    announceList[payload.id - 1] = { ...payload };
    state.announceList = announceList;
  },
  addAnnounceList(state, payload) {
    const announceList = [...state.announceList];
    payload.id = announceList.length + 1;
    state.announceList.push(payload);
  },

  addUserDataList(state, payload) {
    const userDataList = [...state.userDataList];
    payload.id = userDataList.length + 1;
    state.userDataList.push(payload);
  },
  getAllUserData(state, payload) {
    const { userDataList } = payload;
    userDataList.forEach((item, index) => {
      userDataList[index].id = index + 1;
    });
    state.userDataList = userDataList;
  },
  down(state, payload) {
    downloadFile(payload.dataInfo.url, payload.dataInfo.name);
  },
};

export default mutations;
