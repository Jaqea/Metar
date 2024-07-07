const state = {
  isMax: false,
  locationInfo: {
    name: "",
    text: "",
    temperature: "",
  },
  now: {
    name: "",
    clouds: "",
    code: "",
    dew_point: "",
    feels_like: "",
    humidity: "",
    pressure: "",
    temperature: "",
    text: "",
    visibility: "",
    wind_direction: "",
    wind_direction_degree: "",
    wind_scale: "",
    wind_speed: "",
    last_update: "",
  },
  city: {
    aqi: "",
    pm25: "",
    pm10: "",
    so2: "",
    no2: "",
    o3: "",
    co: "",
    primary_pollutant: "",
    quality: "",
    last_update: "2022-01-23T17:00:00+08:00",
    airClass: "air",
    innerClass: "inner",
    color: "",
  },
  weatherDaily: [
    {
      name: "",
      date: "",
      humidity: "",
      text_day: "",
      text_night: "",
      wind_direction: "",
      wind_scale: "",
      wind_speed: "",
      last_update: "",
      code_day: "",
      code_night: "",
      rainfall: "",
      precip: "",
      low: "",
      high: "",
    },
  ],
  options: {
    title: {
      text: "",
    },
    // subtitle: {
    //   text: "数据来源：thesolarfoundation.com",
    // },
    xAxis: {
      title: {
        text: "日期",
      },
      categories: "",
    },
    yAxis: {
      title: {
        text: "摄氏度℃",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "最高气温",
        type: "line",
        data: "",
        color: "#fcc370",
      },
      {
        name: "最低气温",
        type: "line",
        data: "",
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "right",
              verticalAlign: "top",
            },
          },
        },
      ],
    },
  },
  series: [],
  hourly1: [],
  hourly2: [],
  airHourly: [],
  airDaily: [],
  airSearchName: "",
  alarm: {
    alarms: [],
    name: "",
    isEmpty: false,
  },
  tide: {
    last_update: "",
    name: "",
    ports: [
      {
        data: [
          {
            date: "",
            range: [
              {
                time: "",
                height: "",
                type: "",
              },
            ],
            tide: [],
          },
        ],
        port: {
          latitude: "",
          longitude: "",
          sea_level: "",
        },
      },
    ],
  },
  tideOptions: {
    title: {
      text: "",
    },
    // subtitle: {
    //   text: "数据来源：thesolarfoundation.com",
    // },
    xAxis: {
      title: {
        text: "时间",
      },
      categories: "",
    },
    yAxis: {
      title: {
        text: "cm",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "24小时潮汐高度",
        type: "spline",
        data: "",
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "right",
              verticalAlign: "top",
            },
          },
        },
      ],
    },
  },
  tideSeries: [
    {
      data: "",
      name: "",
      type: "",
    },
  ],
  life: {
    last_update: "",
    name: "",
    suggestion: {},
  },
  calendar: [],
  sun: {
    name: "",
    suns: [],
  },
  moon: {
    name: "",
    moons: [],
  },
  airRank: [{ name: "", value: "" }],
  option: {
    name: "",
    year: "",
    title: {
      show: false,
    },
    legend: {
      data: ["降水量", "气温"],
      textStyle: {
        fill: "#fff", // 图例文字的颜色
      },
      //   orient: "vertical",
      left: "65%",
      top: "7%",
    },
    xAxis: {
      nameTextStyle: {
        fill: "#fff",
      },
      data: [],
      axisLabel: {
        style: {
          rotate: 30,
          textAlign: "left",
          textBaseline: "top",
          fill: "#fff",
          fontSize: 9,
        },
      },
      axisLine: {
        style: {
          stroke: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        nameTextStyle: {
          fill: "#fff",
        },
        nameGap: 10,
        name: "降水量",
        data: "value",
        splitLine: {
          style: {
            lineDash: [3, 3],
          },
        },
        min: 0,
        max: 10,
        axisLine: {
          style: {
            stroke: "#fff",
          },
        },
        axisTick: {
          show: false, // 隐藏坐标轴的刻度
        },
        axisLabel: {
          formatter: "{value} mm",
          style: {
            fill: "#fff",
          },
        },
      },
      {
        nameTextStyle: {
          fill: "#fff",
        },
        nameGap: 10,
        name: "气温",
        data: "value",
        position: "right",
        min: 0,
        max: 30,
        interval: 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value} °C",
          style: {
            fill: "#fff",
          },
        },
        axisLine: {
          style: {
            stroke: "#fff",
          },
        },
        axisTick: {
          show: false, // 隐藏坐标轴的刻度
        },
      },
    ],
    series: [],
  },
  option1: {
    title: {
      show: false,
    },
    xAxis: {
      data: [],
      nameTextStyle: {
        fill: "#fff",
      },
      axisLabel: {
        style: {
          fill: "#fff",
          rotate: 30,
          textAlign: "left",
          textBaseline: "top",
          fontSize: 9,
        },
      },
    },
    yAxis: {
      name: "降水概率",
      data: "value",
      nameTextStyle: {
        fill: "#fff",
      },
      nameGap: 10,
      axisLabel: {
        style: {
          fill: "#fff",
        },
      },
      min: 0,
      max: 1,
    },
    series: [],
  },
  option2: {
    title: {
      show: false,
    },
    legend: {
      textStyle: {
        fill: "#fff", // 图例文字的颜色
      },
      data: [
        {
          name: "降水量",
          color: "#fff",
        },
        {
          name: "相对湿度",
          color: "#fff",
        },
      ],
      left: "59%",
      top: "7%",
    },
    xAxis: {
      data: [],
      nameTextStyle: {
        fill: "#fff",
      },
      axisLabel: {
        style: {
          fill: "#fff",
          fontSize: 9,
          rotate: 30,
          textAlign: "left",
          textBaseline: "top",
        },
      },
    },
    yAxis: [
      {
        name: "降水量",
        data: "value",
        nameTextStyle: {
          fill: "#fff",
        },
        min: 0,
        max: 10,
        axisLabel: {
          style: {
            fill: "#fff",
          },
          formatter: "{value} mm",
        },
        nameGap: 10,
      },
      {
        nameGap: 10,
        nameTextStyle: {
          fill: "#fff",
        },
        axisLabel: {
          style: {
            fill: "#fff",
          },
          formatter: "{value} %",
        },
        name: "相对湿度",
        data: "value",
        position: "right",
        min: 0,
        max: 100,
      },
    ],
    series: [],
  },
  optionDate: "",
  series1: [],
  series2: [],
  series3: [],
  userList: [],
  createAccount: "",
  dataList: [],
  announceList: [],
  userDataList: [],
  dashbordList: [],
  option3: {
    title: {
      text: "",
    },
    // subtitle: {
    //   text: "数据来源：thesolarfoundation.com",
    // },
    xAxis: {
      title: {
        text: "时间",
      },
      categories: "",
    },
    yAxis: {
      title: {
        text: "数量",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: "",
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "right",
              verticalAlign: "top",
            },
          },
        },
      ],
    },
  },
  series4: [],
  title3: "",
  categories: [],
  imgList: [],
};

export default state;
