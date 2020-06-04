import moment from "moment";

export default (time) => {
  const _time = moment(time);
  const dayTime = 1000 * 60 * 60 * 24;
  const offset = Math.floor(moment().diff(_time) / dayTime);
  switch (true) {
    case offset === 0:
      return "今天";
    case offset === 1:
      return "昨天";
    case offset > 30:
      return _time.format("MM-DD");
    default:
      return `${offset}天前`;
  }
};
