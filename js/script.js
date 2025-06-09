const startEl = document.getElementById("instructions");
const listEl = document.getElementById("numbers-list");
const progressEl = document.getElementsByClassName("progress-bar")[0];
const formEl = document.getElementById("answers-form");
const messageEl = document.getElementById("message");
const numbers = [];

startEl.addEventListener("click", () => {
  startEl.classList.add("d-none");

  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 9 + 1);

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    listEl.append(numbers[i] + " ");
  }

  listEl.parentElement.classList.remove("d-none");

  let i = 100;
  const progress = setInterval(() => {
    if (i === 0) {
      clearInterval(progress);
    }

    progressEl.setAttribute("style", `width: ${i}%`);
    i = i - 1;
  }, 290);

  setTimeout(() => {
    progressEl.setAttribute("style", `width: 0%`);
    listEl.parentElement.classList.add("d-none");
    formEl.classList.remove("d-none");
  }, 30000);
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  function getValues(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(Number(arr[i].value));
    }

    return newArr;
  }

  const nums = getValues(document.getElementsByTagName("input"));

  const wrongNums = [];
  for (let i = 0; i < nums.length; i++) {
    let count = 0;

    for (let e = 0; e < nums.length; e++) {
      if (nums[i] === nums[e]) {
        count = count + 1;
      }
    }

    if (count >= 2) {
      alert("Non puoi inserire lo stesso numero due o piú volte! Riprova.");
      return;
    }

    if (!numbers.includes(nums[i])) {
      wrongNums.push(nums[i]);
    }
  }

  const missingNums = [];
  for (let i = 0; i < numbers.length; i++) {
    if (!nums.includes(numbers[i])) {
      missingNums.push(numbers[i]);
    }
  }

  formEl.classList.add("d-none");

  if (wrongNums.length === 0 && missingNums.length === 0) {
    messageEl.classList.add("text-success");
    messageEl.innerHTML = "Complimenti! Hai indovinato tutti i numeri!";
  } else {
    messageEl.classList.add("text-danger");
    messageEl.innerHTML = `Peccato! Hai sbagliato.${
      wrongNums.length > 0
        ? `<br>Hai inserito i seguenti numeri sbagliati: ${wrongNums.join(
            ", "
          )}`
        : ""
    }${
      missingNums.length > 0
        ? `<br>Non hai inserito i seguenti numeri: ${missingNums.join(", ")}`
        : ""
    }<br><br>La tua selezione: ${nums.join(" ")}`;

    progressEl.parentElement.classList.add("d-none");
    listEl.parentElement.classList.remove("d-none");
  }
});
