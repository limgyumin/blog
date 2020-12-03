import TimeCounting, { TimeCountingOption } from "time-counting";

export default (time: Date): string => {
  const option: TimeCountingOption = {
    lang: "ko",
    calculate: {
      justNow: 3601,
    },
  };
  return TimeCounting(time, option);
};
