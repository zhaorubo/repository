let input = document.querySelector('.filter-container input')
let div = document.querySelector('#posts-container')
let loader = document.querySelector('.loader')
// console.log(postList)
let count = 0
let flag = true

function createEle(obj) {
    let post = document.createElement('div')
    post.setAttribute('class', 'post')
    post.innerHTML = `<div class="number">${obj.id}</div>`
    let Info = document.createElement('div')
    Info.setAttribute('class', 'post-info')
    Info.innerHTML = `
  <h1 class="post-title">${obj.title}</h1>
  <div class="post-body">${obj.body}</div>
  `
    post.appendChild(Info)
    return post
}

function showLoading() {
    loader.classList.add('show')
    setTimeout(function () {
        loader.classList.remove('show')
        setTimeout(() => {
            for (let i = 0; i <= 4; i++) {
                div.appendChild(createEle(data[count]))
                count++
            }
        }, 500)
    }, 2000)
}

for (let i = 0; i <= 4; i++) {
    div.appendChild(createEle(data[i]))
    count++
}

input.addEventListener('input', function (e) {
    let val = e.target.value
    let postList = document.querySelectorAll('.post')
    postList.forEach(post => {
        // 先要精确找到每个post节点中的title和body 并且获取文本
        const titles = post.querySelector('.post-title').innerHTML
        const body = post.querySelector('.post-body').innerHTML
        // 用val 去遍历查找 titles body 中的字符
        // 看是否有重复 只要titles 或者 body中有重复的
        // 我们都要将post这个节点隐藏起来
        if (titles.indexOf(val) > -1 || body.indexOf(val) > -1) {
            // 保持
            post.style.display = 'flex'
        } else {
            // 隐藏
            post.style.display = 'none'
        }
    })
})

window.addEventListener('scroll', () => {
    // let scrollTop = document.documentElement.scrollTop
    // let clientHeight = document.documentElement.clientHeight
    // let scrollHeight = document.documentElement.scrollHeight
    // ES6的写法
    // 也可以拿到 scrollTop  clientHeight  scrollHeight
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    let scrollNum = scrollTop + clientHeight
    if (scrollNum / scrollHeight >= 0.99) {
        showLoading()
    }
})
