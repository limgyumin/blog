import TimeCounting, { TimeCountingOption } from "time-counting";

export default (time: Date): string => {
  const option: TimeCountingOption = {
    lang: "en",
    calculate: {
      justNow: 3601,
    },
  };

  let timeSentence = TimeCounting(time, option);
  timeSentence = timeSentence === "just now" ? "Just Now" : timeSentence;

  return timeSentence;
};
