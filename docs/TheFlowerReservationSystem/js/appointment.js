let selectUl = document.querySelector('.select ul')
let selectTitle = document.querySelector('.select_title')
let token = sessionStorage.getItem('token')
let tbody = document.querySelector('.appointment_box tbody')

// 渲染日期
function dayEle(obj) {
    let li = document.createElement('li')
    li.setAttribute('data-day', obj.day_time)
    li.innerHTML = obj.day_time

    selectUl.appendChild(li)
}

// 渲染tr
function dayTrEle(obj) {
    let tr = document.createElement('tr')
    tr.setAttribute('data-time', obj.day_time)
    tr.setAttribute('data-id', obj.show_id)
    tr.innerHTML += `
      <td>${obj.show_name}</td>
      <td><button>可预约</button></td>
    `

    tbody.appendChild(tr)
}
// 拿到日期列表数据
function getFetchDay(cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/chooselist?token=${token}`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            cb(res)
        })
}

// 接受index.html发出的url字符串信息并处理 返回一个对象
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

// 拿到预约记录
function getFetchRecord(cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/report`
    fetch(url, {
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

// 拿到当前时间 返回一个时间戳
function getTime() {
    let time = +new Date()
    // console.log(time)
    return time
}

// 拿到日期对应的活动列表
function getFetchDayList(obj, cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/chooseday?token=${token}&day_time=${obj.day_time}`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            cb(res)
        })
}

// 处理列表时间
function strTime(str) {
    let a = '09:00-12:00'
    let arr = a.split('-')
    return arr[0]
}

function getUserRecord(obj, cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/bookday`
    fetch(url, {
        method: 'POST',
        body: `token=${token}&day_time=${obj.day_time}&show_id=${obj.show_id}`,
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

let count = 0
document.body.addEventListener('click', function (e) {
    // 判断点击选择日期里的项 改变样式并渲染（这时点击的是日期列表项）
    if (e.target.parentElement.parentElement.classList.value == 'select') {
        // 改变样式
        selectUl.style.display = 'none'
        // 拿到日期  发起请求  渲染tr列表
        // 拿到日期
        let obj = {
            day_time: e.target.innerHTML
        }
        // 开始渲染tr
        getFetchDayList(obj, function ({ result }) {
            // 已经拿到列表数据

            // 每次渲染之前把上一次的渲染删除
            Array.from(tbody.children).forEach(ele => {
                ele.remove()
            })
            // 渲染tr
            result.list.forEach(ele => {
                dayTrEle(ele)
            })
            selectTitle.innerHTML = tbody.children[0].getAttribute('data-time')
            console.log(result)
            // 拿到预约记录 判断是否可以预约
            getFetchRecord(function ({ result: result_user }) {
                Array.from(tbody.children).forEach(ele => {
                    for (let i = 0; i < result_user.length; i++) {
                        // console.log(time, strTime(ele.children[0].innerHTML))
                        // -------------------判断是否预约--------------------------------------
                        if (
                            ele.getAttribute('data-time') == result_user[i].day_time &&
                            ele.getAttribute('data-id') == result_user[i].show_id
                        ) {
                            ele.lastElementChild.firstElementChild.setAttribute(
                                'disabled',
                                'disabled'
                            )
                            ele.lastElementChild.firstElementChild.innerHTML = '已预约'
                        }
                        // console.log(getTime(), +new Date(result_user[i].createdAt))
                        // ----------------------------------------------------------------
                        let time = +new Date(
                            `${ele.getAttribute('data-time')} ${strTime(ele.children[0].innerHTML)}`
                        )
                        if (+new Date(time) < getTime()) {
                            ele.lastElementChild.firstElementChild.setAttribute(
                                'disabled',
                                'disabled'
                            )
                            ele.lastElementChild.firstElementChild.innerHTML = '已过期'
                        }
                    }
                })
                // console.log(result_user)
                // console.log(+new Date(result_user[0].updatedAt), getTime())
            })
        })
    } else if (e.target.localName == 'span') {
        // 判断点击选择日期 改变样式 （这时点击的是日期title）
        if (count % 2 == 0) {
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

        // 删除上一次的日期列表
        Array.from(selectUl.children).forEach(ele => {
            ele.remove()
        })
        // 点击日期渲染日期
        getFetchDay(function (res) {
            Array.from(res.result.list).forEach(ele => {
                dayEle(ele)
            })
        })
    }
    count++
})

// 点击预约 发送请求 跳转页面
tbody.addEventListener('click', function (e) {
    let daytime = e.target.parentElement.parentElement.getAttribute('data-time')
    let dayid = e.target.parentElement.parentElement.getAttribute('data-id')
    getUserRecord(
        {
            token: token,
            day_time: daytime,
            show_id: dayid
        },
        function (res) {
            console.log(res)
            location.assign(
                `../page/pass.html?token=${token}&id=${res.result.id}&name=${res.result.name}&day_time=${res.result.day_time}&updatedAt=${res.result.updatedAt}`
            )
        }
    )
    // console.log(e.target.parentElement.parentElement.getAttribute('data-id'))
    // console.log(e.target)
})
