export default () => {
  const currentHour: number = new Date().getHours();
  let message: string = "";

  if (currentHour >= 6 && currentHour < 12) {
    message = "좋은 아침입니다. 잠은 잘 주무셨나요? 😉";
  } else if (currentHour >= 12 && currentHour < 17) {
    message = "좋은 점심입니다. 오늘은 무슨 일을 하실 건가요? 😎";
  } else if (currentHour >= 17 && currentHour < 22) {
    message = "좋은 저녁입니다. 식사는 하셨나요? 🙂";
  } else if (currentHour >= 22 || currentHour < 6) {
    message = "얼른 주무세요. 내일도 열심히 해야하니까요. 🥱";
  }

  return message;
};
