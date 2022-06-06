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

function scrollFn() {
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight
    let scrollNum = scrollTop + clientHeight
    if (scrollNum / scrollHeight >= 0.99) {
        loader.classList.add('show')
        setTimeout(function () {
            loader.classList.remove('show')
            for (let i = 0; i <= 4; i++) {
                div.appendChild(createEle(data[count]))
                count++
            }
        }, 2000)
    }
}
for (let i = 0; i <= 4; i++) {
    div.appendChild(createEle(data[i]))
    count++
}
input.addEventListener('input', function () {
    let arr = []
    arr = data.filter((ele, index) => {
        return ele.body.indexOf(input.value) != -1 || ele.title.indexOf(input.value) != -1
    })
    let postList = document.querySelectorAll('.post')
    postList.forEach(ele => {
        ele.remove()
    })
    for (let i = 0; i < 4; i++) {
        div.appendChild(createEle(arr[count]))
        count++
    }
})

window.addEventListener('scroll', scrollFn)
