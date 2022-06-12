let userTitle = document.querySelector('.user_title')
let h5 = document.querySelector('.content_box h5')
let Qrcode = document.querySelector('.qr_code_box')
let saveBtn = document.querySelector('.save_btn')

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

// 获取二维码
function getQrcode(cb) {
    let url = `http://newshopapi.0melon0.cn/api/f_user/Qrcode?id=${str().id}&token=${str().token}`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            cb(res)
        })
}

// 渲染页面
function createPage() {
    userTitle.innerHTML = str().name
    h5.innerHTML = `欢迎您在${str().day_time}10:00参观2022广州国际花卉艺术展暨中国插花花艺展。`
    getQrcode(({ data }) => {
        console.log(data)
        let img = document.createElement('img')
        img.src = data.data
        Qrcode.appendChild(img)

        // 下载二维码
        saveBtn.addEventListener('click', () => {
            const aEle = document.createElement('a')
            aEle.download = 'QR.png'
            aEle.href = data.data
            aEle.click()
        })
    })
}

createPage()
