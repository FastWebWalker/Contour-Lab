import { meta, nav, footer, common } from "./core";
import * as pages from "./pages";
import * as forms from "./forms";
import { servicesList } from "./servicesList";
import { ourServices } from "./ourServices";
import * as extra from "./extra";

const messages = {
  meta,
  nav,
  footer,
  common,
  ...pages,
  ...forms,
  servicesList,
  ourServices,
  ...extra,
};

export default messages;
