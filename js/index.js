let userMsg = document.querySelector('.user_messages')
let iptName = document.querySelector('#name')
let iptPhone = document.querySelector('#phone')
let iptCard = document.querySelector('#card')
let myBtn = document.querySelector('.btn_list :first-child')
let startBtn = document.querySelector('.btn_list :last-child')
let alert_msg = document.querySelector('.alert')
let flag = true
// let iptName = '赵汝波'
// let iptPhone = '15768826766'
// let iptCard = '441732199208021214'

function fetch_msg(bool, obj, cb) {
    let url = 'http://newshopapi.0melon0.cn/api/f_user/register'
    if (bool) {
        fetch(url, {
            method: obj.method,
            body: obj.url,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                cb(res)
            })
    }
}

// 获取预约记录
function getFetchRecord(obj, cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/report`
    fetch(url, {
        method: 'POST',
        body: `phone=${obj.phone}&name=${obj.name}`,
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

function alertFn(yesmsg, nomsg, length, ele, i) {
    if (!Number(ele)) {
        userMsg.children[i].lastElementChild.innerHTML = nomsg
        flag = false
    } else if (ele.length == length) {
        userMsg.children[i].lastElementChild.classList.remove('p_active')
        userMsg.children[i].lastElementChild.classList.add('p_clear')
        setTimeout(function () {
            userMsg.children[i].lastElementChild.classList.remove('p_clear')
            userMsg.children[i].lastElementChild.classList.remove('p_active_remove')

            userMsg.children[i].lastElementChild.innerHTML = yesmsg
            userMsg.children[i].lastElementChild.classList.add('p_active')
        }, 500)
        flag = true
    } else {
        userMsg.children[i].lastElementChild.classList.remove('p_active_remove')
        userMsg.children[i].lastElementChild.classList.add('p_clear')
        setTimeout(function () {
            userMsg.children[i].lastElementChild.classList.remove('p_clear')
            userMsg.children[i].lastElementChild.innerHTML = nomsg
            userMsg.children[i].lastElementChild.classList.add('p_active_remove')
        }, 500)
        flag = false
    }
}

myBtn.addEventListener('click', function () {
    let obj = {
        method: 'POST',
        url: `name=${iptName.value}&phone=${iptPhone.value}&card=${iptCard.value}`,
        strMsg: '请输入正确的内容'
    }
    fetch_msg(flag, obj, function (res) {
        console.log(res)
        if (res.msg == '登录成功') {
            console.log(res)
            sessionStorage.setItem('token', res.result.token)
            getFetchRecord(
                {
                    phone: iptPhone.value,
                    name: iptName.value
                },
                res => {
                    console.log(res)
                    if (res.result.length != 0) {
                        location.assign(
                            `../page/my_pass.html?phone=${iptPhone.value}&name=${iptName.value}&card=${iptCard.value}`
                        )
                    } else {
                        location.assign('../page/my_pass_no.html')
                    }
                }
            )
        } else {
            alert('登陆失败')
        }
    })
})

startBtn.addEventListener('click', function () {
    console.log(1)
    let obj = {
        method: 'POST',
        url: `name=${iptName.value}&phone=${iptPhone.value}&card=${iptCard.value}`,
        strMsg: '请输入正确的内容'
    }
    fetch_msg(flag, obj, function (res) {
        console.log(res)
        if (res.msg == '登录成功') {
            sessionStorage.setItem('token', res.result.token)
            let str = `../page/appointment.html?phone=${iptPhone.value}&name=${iptName.value}&card=${iptCard.value}`
            location.assign(str)
            console.log(res)
        } else {
            alert('登陆失败')
        }
    })
})

iptName.addEventListener('blur', function () {
    if (this.value) {
        userMsg.children[0].lastElementChild.classList.remove('p_clear')
        userMsg.children[0].lastElementChild.classList.remove('p_active_remove')
        setTimeout(function () {
            userMsg.children[0].lastElementChild.innerHTML = '输入正确'
            userMsg.children[0].lastElementChild.classList.add('p_active')
        }, 500)
    } else {
        userMsg.children[0].lastElementChild.classList.remove('p_active')
        userMsg.children[0].lastElementChild.classList.remove('p_active_remove')
        setTimeout(function () {
            userMsg.children[0].lastElementChild.innerHTML = '请输入名字'
            userMsg.children[0].lastElementChild.classList.add('p_active_remove')
        }, 500)
    }
})

iptPhone.addEventListener('blur', function () {
    // let a = console.log(a)
    alertFn('手机号输入正确', '请重新输入手机号', 11, this.value, 1)
})

iptCard.addEventListener('blur', function () {
    console.log(1)
    alertFn('身份证输入正确', '身份证号输入不正确', 18, this.value, 2)
})
