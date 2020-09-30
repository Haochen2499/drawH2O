import moment from "moment";

export default (time, showDetail = false) => {
  const _time = moment(time);
  const hourTime = 1000 * 60 * 60;
  const offset = Math.floor(moment().diff(_time) / hourTime);
  switch (true) {
    case offset === 0:
      if (showDetail) {
        return _time.format("HH:MM");
      } else {
        return "刚刚";
      }
    case offset < 24 && offset > 0:
      return `${offset}小时前`;
    case offset > 30 * 24:
      return _time.format("MM-DD");
    default:
      return `${Math.floor(offset / 24)}天前`;
  }
};
