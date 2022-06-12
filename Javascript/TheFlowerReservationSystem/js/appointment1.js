let token = sessionStorage.getItem('token')
let tbody = document.querySelector('.appointment_box tbody')
let selectUl = document.querySelector('.select ul')
let select = document.querySelector('.select')
function getFetch(url, cb) {
    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (res) {
            cb(res)
        })
}

// 可预约   已经预约的场次的数据里面没有已有的场次 && 当前时间  >  当前已有的场次时间

// 过期     当前的时间 < 当前已有场次的时间

// 不可预约  已经预约的场次的数据里面 有 已有的场次

function createTr(obj) {
    let tr = document.createElement('tr')
    tr.setAttribute('data-time', obj.day_time)
    tr.innerHTML += `
      <td data-id=${obj.show_id}>${obj.show_name}</td>
      <td><button class="btn"></button></td>
`
    tbody.appendChild(tr)
}

// 去预约
function appointment(obj, cb) {
    let url = 'http://newshopapi.0melon0.cn/api/f_user/bookday'
    fetch(url, {
        method: 'POST',
        body: `token=${token}&day_time=${obj.time}&show_id=${obj.id}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (res) {
            cb(res)
        })
}

function selectFn(e) {
    if (e.target.parentElement.parentElement.classList.value == 'select') {
        selectUl.style.display = 'none'
        let url2 = `http://newshopapi.0melon0.cn/api/f_user/chooseday?token=${token}&day_time=${e.target.dataset.time}`

        // 渲染 tr 场次列表
        getFetch(url2, function ({ result: data }) {
            console.log(data)
            select.children[0].innerHTML = e.target.getAttribute('data-time')
            Array.from(tbody.children).forEach(ele => {
                ele.remove()
            })
            data.list.forEach(ele => {
                createTr(ele)
            })
            // // 状态渲染
            // Array.from(tbody.children).forEach(elel => {
            //     // let num = ele.firstElementChild.innerHTML.split('-')
            //     // let timeOne = num[0]
            //     // let timeTwo = num[1]
            //     // num = +new Date(num)
            //     // num = +new Date(`${select.firstElementChild.innerHTML} ${timeOne}`)
            //     // timeTwo = +new Date(`${select.firstElementChild.innerHTML} ${timeTwo}`)
            //     // console.log(num)
            //     // 列表时间
            //     let time = nowTime()
            //     let day = select.firstElementChild
            //     day = Number(day.innerHTML.split('-')[2])
            //     console.log(num)
            //     console.log(time.day1)
            //     data.list.forEach(ele => {
            //         let num = +new Date(`${ele.day_time} ${ele.show_name}`)
            //         if (num > time.day1) {
            //             elel.lastElementChild.firstElementChild.innerHTML = '可预约'
            //         } else if (time.day1 > num) {
            //             console.log('guoqi')
            //             elel.lastElementChild.firstElementChild.setAttribute('disabled', 'disabled')
            //             elel.lastElementChild.firstElementChild.innerHTML = '已过期'
            //         }
            //     })

            //     getReport(function (res) {
            //         console.log(res)
            //         Array.from(res.result).forEach(ele => {
            //             let a = +new Date(ele.day_time)
            //             let resId = ele.show_id
            //             Array.from(tbody.children).forEach(ele => {
            //                 let b = +new Date(ele.getAttribute('data-time'))

            //                 if (
            //                     ele.firstElementChild.getAttribute('data-id') == resId &&
            //                     a == b &&
            //                     time.day < day
            //                 ) {
            //                     ele.lastElementChild.firstElementChild.setAttribute(
            //                         'disabled',
            //                         'disabled'
            //                     )

            //                     ele.lastElementChild.firstElementChild.innerHTML = '不可预约'
            //                 }
            //             })
            //         })
            //         let a = +new Date(res.result[0].day_time)
            //     })
            // })
        })
    } else if (e.target.localName == 'span') {
        if (num % 2 == 0) {
            selectUl.style.display = 'block'
            anime({
                targets: selectUl,
                translateY: [-50, 0],
                scale: 1,
                duration: 1000
            })
        } else {
            selectUl.style.display = 'none'
        }
    }
    num++
}

function nowTime() {
    let date = new Date()

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day1 = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    // console.log(year, month, day1, ':', hour, minute, second)
    // let timeDay = `${year}-${month}-${day1} `
    // let time = `${hour}:${minute}:${second}`
    // let time = hour
    // console.log(timeDay)
    // console.log(time)
    let obj = {
        hour: +new Date(hour),
        day1: +new Date(`${year}-${month}-${day1} ${hour}:${minute}`),
        day: day1
    }
    return obj
}

let num = 0
document.body.addEventListener('click', selectFn)

tbody.addEventListener('click', e => {
    if (e.target.localName == 'button') {
        getReport(function (res) {
            let bool = Array.from(res.result).some(ele => {
                return (
                    ele.day_time.replace('-', '-0') == select.children[0].innerHTML &&
                    ele.show_id ==
                        e.target.parentElement.previousElementSibling.getAttribute('data-id')
                )
            })
            if (!bool) {
                appointment(
                    {
                        time: e.target.parentElement.previousElementSibling.parentElement.getAttribute(
                            'data-time'
                        ),
                        id: e.target.parentElement.previousElementSibling.getAttribute('data-id')
                    },
                    function (res) {
                        location.assign(`../page/pass.html?token=${token}`)
                        console.log(res)
                    }
                )
            }
        })
        //请求回来渲染的操作
    }
})

// get 日期并渲染
let url = `http://newshopapi.0melon0.cn/api/f_user/chooselist?token=${token}`
getFetch(url, function (res) {
    res.result.list.forEach(ele => {
        let li = document.createElement('li')
        li.setAttribute('data-time', ele.day_time)
        li.innerHTML = ele.day_time
        selectUl.appendChild(li)
    })
    date = res
})

function str() {
    let str = decodeURIComponent(location.search)
    console.log(location.search)
    str = str.slice(1)
    let obj = {}
    // console.log(str)
    str.split('&').forEach((ele, index) => {
        let arr = ele.split('=')
        obj[arr[0]] = arr[1]
    })
    return obj
}

function getReport(cb) {
    let url3 = `http://newshopapi.0melon0.cn/api/f_user/report`
    fetch(url3, {
        method: 'POST',
        body: `phone=${str().phone}&name=${str().name}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (res) {
            cb(res)
        })
}
