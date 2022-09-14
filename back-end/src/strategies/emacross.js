const { ema } = require("./indicator/ma");

const cdc = (data) => {
  const fast = 12;
  const slow = 26;
  return emacross(data, { fast, slow });
};

const ema_10_21 = (data) => {
  const fast = 12;
  const slow = 26;
  return emacross(data, { fast, slow });
};

const emacross = (data, { fast, slow }) => {
  try {
    // check is data null or undefined
    if (typeof data === "undefined" || data === null) return "No Data";

    const slow_ema = ema(slow, data);
    const fast_ema = ema(fast, data);

    const l = data.length - 1;

    let today, Yday;

    if (fast_ema[l] > slow_ema[l]) today = true;
    else today = false;

    if (fast_ema[l - 1] > slow_ema[l - 1]) Yday = true;
    else Yday = false;

    if (today != Yday) {
      if (today) return "BUY🟢";
      else return "SELL🔴";
    } else return "No Action";
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cdc, ema_10_21 };
