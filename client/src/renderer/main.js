import Vue from "vue";
import {
  Carousel,
  CarouselItem,
  Tag,
  Divider,
  Empty,
  Select as SelectE,
  Option,
  RadioGroup,
  Radio as RadioE,
  Input as InputE,
  Form,
  FormItem,
  Button as ButtonE,
  Upload,
  Dialog,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/theme/element-variables.scss";
import {
  Input,
  Radio,
  Button,
  Checkbox,
  Message,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Tooltip,
  Card,
  Popover,
  Table,
  Pagination,
} from "at-ui";
import "at-ui-style/src/index.scss";
import "nprogress/nprogress.css";
import { ipcRenderer } from "electron";
import tinymce from "tinymce";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";

import borderBox11 from "./dataV/components/borderBox11";
import borderBox8 from "./dataV/components/borderBox8";
import borderBox1 from "./dataV/components/borderBox1";
import borderBox4 from "./dataV/components/borderBox4";
import borderBox12 from "./dataV/components/borderBox12";
import decoration3 from "./dataV/components/decoration3";
import scrollRankingBoard from "./dataV/components/scrollRankingBoard";
import charts from "./dataV/components/charts";
import App from "./App.vue";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Tooltip);
Vue.use(Card);
Vue.use(Popover);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(Input);
Vue.use(ButtonE);
Vue.use(InputE);
Vue.use(RadioE);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Empty);
Vue.use(SelectE);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(borderBox11);
Vue.use(borderBox8);
Vue.use(borderBox1);
Vue.use(borderBox4);
Vue.use(borderBox12);
Vue.use(scrollRankingBoard);
Vue.use(decoration3);
Vue.use(charts);
Vue.prototype.$Message = Message;
Vue.prototype.$tinymce = tinymce;
Vue.config.productionTip = false;

ipcRenderer.on("isMax", (_, status) => {
  store.commit("home/isMax", status);
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
