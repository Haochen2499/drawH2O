import Vue from "vue";
import { Message, Modal, LoadingBar } from "view-design";

Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Loading = LoadingBar;

import "view-design/dist/styles/iview.css";
