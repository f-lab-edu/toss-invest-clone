import App from "@/App";
import SignIn from "@/pages/SignIn.tsx";

const routes = [
  {
    path: "/",
    Component: App,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
];

export default routes;
