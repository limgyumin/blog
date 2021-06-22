import TimeCounting, { TimeCountingOption } from "time-counting";

export default (time: Date): string => {
  const option: TimeCountingOption = {
    lang: "en",
    calculate: {
      justNow: 3601,
    },
  };

  return TimeCounting(time, option).replace("just now", "Just now");
};
