const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#7FFFD4', '#E52B50', '#A8E4A0', '#990066', '#F5F5DC', '#FFCBDB', '#F4A900', '#E6E6FA', '#FF8C69']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
        if (current <= 5) {
            timeEl.classList.add('danger')
        }
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score is </br><span class='primary'>${score}</span></h1>`

    const restart = document.createElement('button')
    restart.classList.add('restart')
    restart.innerHTML = `Restart`
    board.appendChild(restart)

    restart.addEventListener('click', (event) => {
        if (event.target.classList.contains('restart')) {
            window.parent.location = window.parent.location.href;
        }
    })
}

function createCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')

    // Random circle size
    size = getRandomNumber(10, 60)
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    // Random circle location
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    // Random circle color
    const color = getRandomColor()
    circle.style.backgroundColor = color

    board.appendChild(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
