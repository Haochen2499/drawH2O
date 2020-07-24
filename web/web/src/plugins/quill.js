import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/atom-one-dark.css";
import "../styles/quill.scss";

// import Vue from "vue";
// import vueQuillEditor, { Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
// import ImageResize from "quill-image-resize-module";
// import hljs from "highlight.js";
// import { Message } from "view-design";

// Quill.register("modules/ImageExtend", ImageExtend);
// Quill.register("modules/ImageResize", ImageResize);

// const imgUrl = url => {
//   const host =
//     process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";
//   return host + url;
// };

// Vue.use(vueQuillEditor, {
//   placeholder: "请在这里输入",
//   modules: {
//     ImageResize: {},
//     ImageExtend: {
//       loading: true,
//       size: 1,
//       name: "file",
//       action: "/api/upload/image",
//       sizeError: () => Message.error("图片大小不得超过1M"),
//       onError: () => Message.error("上传失败"),
//       response: res => {
//         return imgUrl(res.data.url);
//       }
//     },
//     syntax: {
//       highlight: text => hljs.highlightAuto(text).value
//     },
//     toolbar: {
//       container,
//       handlers: {
//         image: function() {
//           QuillWatch.emit(this.quill.id);
//         }
//       }
//     }
//   }
// });
