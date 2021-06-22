import moment from "moment";

export default (date: Date): string => {
  return moment(date).locale("en").format("D MMM, YYYY");
};
