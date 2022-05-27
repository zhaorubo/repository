let btn = document.querySelector('#btn')
let zz = document.querySelector('.boxsmall')
let loginBox = document.querySelector('.login-box')
let leftBtn = document.querySelector('.left-top-box')
console.log(leftBtn)
btn.addEventListener('click', function () {
    zz.classList.remove('none')
    loginBox.classList.remove('none')
    loginBox.classList.add('ani')
})

document.querySelector('.login-header span').addEventListener('click', function () {
    zz.classList.add('none')
    loginBox.classList.add('none')
    loginBox.classList.remove('ani')
})

let body = document.body
let count = 1
leftBtn.addEventListener('click', function () {
    if (count % 2 == 0) {
        body.classList.add('body-style-none')
        body.classList.remove('body-style')
    } else {
        body.classList.add('body-style')
        body.classList.remove('body-style-none')
    }
    count++
    console.log(count)
})
