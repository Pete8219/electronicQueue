let calendarBody = document.querySelector(".calendar-body")

let holidays = [0, 1, 6]

let time = new Date()

let weekend = time.getDay()
if (weekend == 0) {
  let countEmptyDay = 6
  drawEmptyDay(countEmptyDay)
}

if (weekend > 0) {
  drawEmptyDay(weekend)
}

function drawEmptyDay(count) {
  for (let i = 1; i < count; i++) {
    let item = document.createElement("div")
    item.classList.add("empty-item")
    calendarBody.append(item)
  }
}

drawCalendar()

function drawCalendar() {
  for (let i = 0; i < 30; i++) {
    let time = new Date()
    let options = {
      month: "long",
      day: "numeric",
      timezone: "UTC"
    }
    time.setDate(time.getDate() + i)

    let bodyItem = document.createElement("div")
    bodyItem.classList.add("calendar-body-item")
    holidays.map(day => {
      if (time.getDay() == day) {
        bodyItem.classList.add("holiday")
      }
    })

    let a = document.createElement("a")
    a.href = "#"
    bodyItem.append(time.toLocaleString("ru", options))

    if (bodyItem.classList.contains("holiday")) {
      a.href = "sfksjhfkjsdhf"
      a.classList.add("disabled")
    }
    a.append(bodyItem)
    calendarBody.appendChild(a)
  }
}
