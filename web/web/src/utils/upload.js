import fetch from "./fetch";
import { Message } from "view-design";
export default async (file, type = "image") => {
  console.log(file);
  if (!file) {
    return;
  }
  let formData = new FormData();
  formData.append("file", file);
  let url;
  switch (type) {
    case "image":
      url = "/api/upload/image";
      break;
    default:
      break;
  }
  const res = await fetch.post(url, formData);
  if (res.error_code === 0) {
    Message.success("上传成功");
    return res.data.url;
  } else {
    Message.error(res.data.error_msg);
    return null;
  }
};
