import Vue from "vue";
import { Button, Message } from "view-design";

Vue.component("Button", Button);
Vue.prototype.$Message = Message;

import "view-design/dist/styles/iview.css";
