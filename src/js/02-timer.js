// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// flatpickr('#datetime-picker', options);

// const timerDays = document.querySelector('[data-days]');
// const timerHours = document.querySelector('[data-hours]');
// const timerMinutes = document.querySelector('[data-minutes]');
// const timerSeconds = document.querySelector('[data-seconds]');
// const startButton = document.querySelector('[data-start]');

// let deadline;

// function getTimeRemaining() {
//   const total = Date.parse(deadline) - Date.parse(new Date());
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));

//   return {
//     total,
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// }

// function initializeClock() {
//   function updateClock() {
//     const t = getTimeRemaining();

//     timerDays.innerHTML = ('0' + t.days).slice(-2);
//     timerHours.innerHTML = ('0' + t.hours).slice(-2);
//     timerMinutes.innerHTML = ('0' + t.minutes).slice(-2);
//     timerSeconds.innerHTML = ('0' + t.seconds).slice(-2);

//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }

//   updateClock();
//   const timeinterval = setInterval(updateClock, 1000);
// }

// startButton.addEventListener('click', () => {
//   deadline = new Date(document.querySelector('#datetime-picker').value);
//   initializeClock();
// });

// const fp = flatpickr('#date', {
//   // опції конфігурації календаря
//   onClose(selectedDates, dateStr, instance) {
//     const selectedDate = selectedDates[0];
//     if (selectedDate < Date.now()) {
//       window.alert('Please choose a date in the future');
//     }
//   },
// });
// і;

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const strBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minField = document.querySelector('[data-minutes]');
const secField = document.querySelector('[data-seconds]');

let countInterval = null;
let targetDate = null;

Notiflix.Report.info(
  ' 🤟🏼 Hello my Friend!',
  'Please, choose a date and click on start',
  'Okay'
);

const upTime = () => {
  const currentDate = new Date();
  const remTime = targetDate - currentDate;

  if (remTime < 0) {
    clearInterval(countInterval);
    strBtn.disabled = true;
    dateTimePicker.disabled = false;
    Notiflix.Report.info('Info', 'Please choose a date in the future', 'Okey');
    return;
  }

  const days = Math.floor(remTime / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((remTime / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remTime / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((remTime / 1000) % 60)
    .toString()
    .padStart(2, '0');

  daysField.textContent = days;
  hoursField.textContent = hours;
  minField.textContent = minutes;
  secField.textContent = seconds;
};

const strCount = () => {
  targetDate = new Date(dateTimePicker.value);
  countInterval = setInterval(upTime, 1000);
  strBtn.disabled = true;
  dateTimePicker.disabled = true;
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      Notiflix.Report.failure(
        'Oppss...🧟‍♂️',
        'Please choose a date in the future',
        'Try again'
      );
      strBtn.disabled = true;
    } else {
      Notiflix.Report.success(
        'Great 😎',
        'The selected date is in the future. Click `Start` to continue',
        'Start'
      );
      strBtn.disabled = false;
    }
  },
});

strBtn.addEventListener('click', strCount);
