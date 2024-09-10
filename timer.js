let previousSecondLocal = 0;
let accumulatedSecondDegreeLocal = 0;
let previousSecondUK = 0;
let accumulatedSecondDegreeUK = 0;

function setClock() {
  updateClock("local", new Date());
  updateClock(
    "uk",
    new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/London" }))
  );
}

function updateClock(type, now) {
  const hourHand = document.getElementById(`${type}-hour`);
  const minuteHand = document.getElementById(`${type}-minute`);
  const secondHand = document.getElementById(`${type}-second`);
  const timeDisplay = document.getElementById(`${type}-time-display`);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = seconds * 6; // 每秒 6 度
  const minuteDeg = minutes * 6 + seconds * 0.1; // 每分鐘 6 度 + 秒的部分
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 每小時 30 度 + 分鐘的部分

  if (type === "local") {
    if (seconds < previousSecondLocal) {
      accumulatedSecondDegreeLocal += 6; // 增加完整的一圈
    } else {
      accumulatedSecondDegreeLocal += (seconds - previousSecondLocal) * 6;
    }
    previousSecondLocal = seconds;

    secondHand.style.transform = `rotate(${accumulatedSecondDegreeLocal}deg)`;
  } else {
    if (seconds < previousSecondUK) {
      accumulatedSecondDegreeUK += 6; // 增加完整的一圈
    } else {
      accumulatedSecondDegreeUK += (seconds - previousSecondUK) * 6;
    }
    previousSecondUK = seconds;

    secondHand.style.transform = `rotate(${accumulatedSecondDegreeUK}deg)`;
  }

  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;

  // 更新日期時間文字
  const dateString = now.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = now.toLocaleTimeString("en-GB");
  timeDisplay.textContent = `${dateString} ${timeString}`;

  if (type === "local" || type === "uk") {
    setBackground(hours, type);
  }
}

function setBackground(hours, type) {
  const sun = document.querySelector(`.${type}-sun`);
  const moon = document.querySelector(`.${type}-moon`);

  if (hours >= 6 && hours < 18) {
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    sun.style.display = "none";
    moon.style.display = "block";
  }

  document.querySelectorAll(`.${type} .mountain`).forEach((mountain) => {
    mountain.style.backgroundColor = mountainColor;
  });
}

setInterval(setClock, 1000);
setClock(); // 初始設置
