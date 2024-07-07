import { auth, guest } from "../middleware";
import children from "./Home";

function load(component) {
  return (resolve) => require([`views/${component}`], resolve);
}

const routes = [
  {
    path: "/home",
    name: "Home",
    component: load("Home"),
    meta: {
      middleware: [auth],
    },
    children,
  },
  {
    path: "/login",
    name: "Login",
    component: load("Login"),
    meta: {
      middleware: [guest],
      showTop: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: load("Register"),
    meta: {
      middleware: [guest],
      showTop: false,
    },
  },
  {
    path: "/findPassword",
    name: "FindPassword",
    component: load("FindPassword"),
    meta: {
      middleware: [guest],
      showTop: false,
    },
  },
];

export default routes;
