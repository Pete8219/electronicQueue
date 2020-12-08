let dateStart = "14:00";
let dateEnd = "17:00";
let timeToReceipt = "00:15";
let countTickets;


dateStart = dateStart.slice(0, 2)
dateEnd = dateEnd.slice(0, 2)
timeToReceipt = timeToReceipt.slice(-2)
countTickets = (dateEnd - dateStart) * 60 / timeToReceipt

console.log(countTickets)


// скрипт построения временных интервалов для выбора в процессе записи для получения талона

let calendar = document.querySelector(".calendar")

let dateStart = "15:00"
let dateEnd = "17:00"
let busy = "15:20"
let stepUp = 20
let x = (dateEnd.slice(0, 2) - dateStart.slice(0, 2)) * 60 / stepUp
let timeArray = ["15:20", "16:00", "16:40"] // массив времени которое уже занято

function createTimeList() {
  for (i = 0; i <= x; i++) {

    let input = document.createElement("input")
    input.setAttribute('type', 'time')
    input.setAttribute('id', 'myTime' + i)
    input.setAttribute('min', dateStart)
    input.setAttribute('max', dateEnd)
    input.value = dateStart
    calendar.appendChild(input)
    document.getElementById("myTime" + i).stepUp(stepUp * i)
    document.getElementById("myTime" + i).style.margin = "20px"
    y = document.getElementById("myTime" + i)
    timeArray.map((item) => { // обработка массива уже полученных талонов и удаление их из списка доступных
      if (document.getElementById("myTime" + i).value == item) {
        document.getElementById("myTime" + i).style.display = "none"

      }
    })

  }
}

createTimeList()



//скрипт с добавленными кнопками

let calendar = document.querySelector(".calendar")

let dateStart = "15:00"
let dateEnd = "17:00"
let busy = "15:20"
let stepUp = 20
let x = (dateEnd.slice(0, 2) - dateStart.slice(0, 2)) * 60 / stepUp
let timeArray = ["15:20", "16:00", "16:40"]

function createTimeList() {
  for (i = 0; i <= x; i++) {
    let div = document.createElement("div")
    div.classList.add("calendar-item")
    div.style.width = "25%"
    div.style.float = "left"

    calendar.appendChild(div)
    let input = document.createElement("input")
    let btn = document.createElement("button")
    btn.classList.add("button" + i)

    let node = document.createTextNode("Записаться")
    btn.appendChild(node)
    btn.style.width = "100px"
    input.setAttribute('type', 'time')
    input.setAttribute('id', 'myTime' + i)
    input.setAttribute('min', dateStart)
    input.setAttribute('max', dateEnd)
    input.value = dateStart
    div.appendChild(input)
    document.getElementById("myTime" + i).stepUp(stepUp * i)
    document.getElementById("myTime" + i).style.margin = "20px"
    document.getElementById("myTime" + i).readOnly = true
    input.after(btn)
    y = document.getElementById("myTime" + i).value
    timeArray.map((item) => {
      if (y == item) {
        document.getElementById("myTime" + i).style.display = "none"
        document.querySelector(".button" + i).style.display = "none"


      }
    })

  }
}

createTimeList()



/* Подсчет талонов */




let dateStart = '15:00',
    dateEnd = '18:00',
    step = '30'
count = (dateEnd.slice(0,2) - dateStart.slice(0,2)) * 60 / step;
let timeToReceipt = [];

for (i = 0; i <= count; i++) {
  d = new Date()
  d.setHours(dateStart.slice(0,2), step*i, 0)
  
  timeToReceipt.push(d.toLocaleString())
  console.log(timeToReceipt[i])
}



