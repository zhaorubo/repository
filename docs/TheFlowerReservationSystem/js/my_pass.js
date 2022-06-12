let msgList = document.querySelector('.msg_list')
function createMsgList(obj) {
    let div = document.createElement('div')
    div.classList.add('msg_box')
    div.setAttribute('data-id', obj.id)
    div.innerHTML = `
                  <div class="item_one">
                    <p class="user_name">姓名：<span>${obj.name}</span></p>
                    <p class="user_name">日期：<span>${obj.day}</span></p>
                    <p class="user_time">场次：<span>${obj.time}</span></p>
                  </div>
                  <div class="item_two">
                     <img class="Qr_code"></img>
                     <button class="back_btn">返回</button>
                  </div>
                  `
    let button = document.createElement('button')
    button.innerHTML = '获取二维码'
    button.classList.add('Qr_btn')
    div.appendChild(button)
    return div
}

// 获取某天场次的二维码
function getQrCode(obj, cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/Qrcode?token=${obj.token}&id=${obj.id}`
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
// 获取预约记录
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
// 获取某天场次列表
function getChooseDay(obj, cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/chooseday?token=${obj.token}&day_time=${obj.day_time}`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            cb(res)
        })
}

// 请求并渲染
getFetchRecord(({ result }) => {
    console.log(result)
    result.forEach(record => {
        let obj = {
            token: sessionStorage.getItem('token'),
            day_time: record.day_time
        }

        // 获取某天预约的 场次 进行二维码渲染

        // 渲染msg_box
        getChooseDay(obj, res => {
            console.log(res)
            res.result.list.forEach(pass => {
                if (pass.day_time == record.day_time && pass.show_id == record.show_id) {
                    msgList.appendChild(
                        createMsgList({
                            name: record.name,
                            time: pass.show_name,
                            day: pass.day_time,
                            id: record.id
                        })
                    )
                }
            })
        })
    })
})

let box = document.querySelector('.msg_list')
box.addEventListener('click', function (e) {
    if (e.target.classList.value == 'Qr_btn') {
        let id = e.target.parentElement.getAttribute('data-id')
        let itemTwo = e.target.previousElementSibling
        console.log(itemTwo)
        getQrCode(
            {
                token: sessionStorage.getItem('token'),
                id: id
            },
            function ({ data }) {
                itemTwo.style.display = 'block'
                itemTwo.firstElementChild.src = data.data
                anime({
                    targets: itemTwo,
                    translateX: [-300, 0],
                    duration: 500,
                    backgroundColor: '#FFF',
                    easing: 'easeInOutQuad'
                })
            }
        )
    }

    if (e.target.classList.value == 'back_btn') {
        console.log('点击了返回')
        let backToItemTwo = e.target.parentElement
        anime({
            targets: backToItemTwo,
            translateX: -300,
            duration: 500,
            // backgroundColor: '#FFF',
            easing: 'easeInOutQuad'
        })
        // backToItemTwo.style.display = 'none'
    }
})
