// 获取节点
const postsContainer = document.getElementById('posts-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')
let limit = 5
let page = 0
function getPost(cb) {
    let xhr = new XMLHttpRequest()
    let url = `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    xhr.open('get', url)
    xhr.send()
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText)
            cb(data)
        }
    })
}
// let data = [
//     {
//         id: 1,
//         title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//         body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
//     },
//     {
//         userId: 1,
//         id: 2,
//         title: 'qui est esse',
//         body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
//     },
//     {
//         userId: 1,
//         id: 3,
//         title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
//         body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut'
//     },
//     {
//         id: 4,
//         title: 'eum et est occaecati',
//         body: 'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit'
//     },
//     {
//         id: 5,
//         title: 'nesciunt quas odio',
//         body: 'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque'
//     },
//     {
//         id: 6,
//         title: 'dolorem eum magni eos aperiam quia',
//         body: 'ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae'
//     },
//     {
//         id: 7,
//         title: 'magnam facilis autem',
//         body: 'dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut saepe quidem repellat excepturi ut quia sunt ut sequi eos ea sed quas'
//     },
//     {
//         id: 8,
//         title: 'dolorem dolore est ipsam',
//         body: 'dignissimos aperiam dolorem qui eum facilis quibusdam animi sint suscipit qui sint possimus cum quaerat magni maiores excepturi ipsam ut commodi dolor voluptatum modi aut vitae'
//     },
//     {
//         id: 9,
//         title: 'nesciunt iure omnis dolorem tempora et accusantium',
//         body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas'
//     },
//     {
//         id: 10,
//         title: 'optio molestias id quia eum',
//         body: 'quo et expedita modi cum officia vel magni doloribus qui repudiandae vero nisi sit quos veniam quod sed accusamus veritatis error'
//     },
//     {
//         id: 11,
//         title: 'et ea vero quia laudantium autem',
//         body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit vel qui neque voluptates ut commodi qui incidunt ut animi commodi'
//     },
//     {
//         id: 12,
//         title: 'in quibusdam tempore odit est dolorem',
//         body: 'itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio'
//     },
//     {
//         id: 13,
//         title: 'dolorum ut in voluptas mollitia et saepe quo animi',
//         body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque iste corrupti reiciendis voluptatem eius rerum sit cumque quod eligendi laborum minima perferendis recusandae assumenda consectetur porro architecto ipsum ipsam'
//     },
//     {
//         id: 14,
//         title: 'voluptatem eligendi optio',
//         body: 'fuga et accusamus dolorum perferendis illo voluptas non doloremque neque facere ad qui dolorum molestiae beatae sed aut voluptas totam sit illum'
//     },
//     {
//         id: 15,
//         title: 'eveniet quod temporibus',
//         body: 'reprehenderit quos placeat velit minima officia dolores impedit repudiandae molestiae nam voluptas recusandae quis delectus officiis harum fugiat vitae'
//     }
// ]
let num = 5
// 1.展示前5条博客内容
showPost()

function showPost() {
    // 1.提取数据 0-5
    getPost(function (data) {
        console.log(data)
        let posts = data
        // let posts = data.slice(num - 5, num) //[{},{},{},{},{}]
        // 2. 结合数据渲染结构
        posts.forEach(function (ele) {
            const div = document.createElement('div')
            div.classList.add('post')
            //创建出 <div class="post"></div>
            div.innerHTML = `
                          <div class="post-info">
                            <h2 class="post-title">${ele.title}</h2>
                            <div class="post-body">${ele.body}</div>
                          </div>
                          <div class="number">${ele.id}</div>
                          `
            //最后一步，div放到页面中
            postsContainer.appendChild(div)
        })
    })
}

//功能2:触底加载数据  step1 加载动画 step2 拼接数据
window.addEventListener('scroll', function () {
    // es6的写法
    // 也可以拿到scrollTop scrollHeight clientHeight
    // scrollTop +  clientHeight 等于 scrollHeight 说明触底
    let { scrollTop, scrollHeight, clientHeight } = document.documentElement
    // let {scrollTop} = document.documentElement
    let a = scrollTop + clientHeight
    if (a / scrollHeight > 0.9) {
        // console.log('快要到底了')
        showIoading()
    }
})

function showIoading() {
    // 开启一个定时器，确保动画执行后，再拼接数据
    // 添加类名 动画出现 1s 2s
    // 再去拼接数据
    loading.classList.add('show')
    setTimeout(function () {
        loading.classList.remove('show')
        //再去操作数据
        setTimeout(function () {
            page++
            //切割数据并渲染
            showPost()
        }, 500)
    }, 1500)
}

filter.addEventListener('input', function (e) {
    // console.log(e.target.value)
    let val = e.target.value
    // 根据val的字符串 查找所有title 和 body的字符 是否重复
    // 如果重复，把对应的节点隐藏起来
    let posts = document.querySelectorAll('.post')
    posts.forEach(function (post) {
        //先要精确找到每个post节点中的title 和 body
        const titles = post.querySelector('.post-title').innerHTML
        const body = post.querySelector('.post-body').innerHTML
        //用val 去遍历查找 titles body中字符，
        //看是否有重复， 只要titles 或着 body 中有重复的
        //我们都要将post 这个节点隐藏起来
        //val "sunt"
        if (titles.indexOf(val) > -1 || body.indexOf(val) > -1) {
            //保持
            post.style.display = 'flex'
        } else {
            //隐藏
            post.style.display = 'none'
        }
    })
})

// let limit = 5;
// let page = 1;

// fetch posts from API
// async function getPosts() {
//   const res = await fetch(
//     `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
//   );

//   const data = await res.json();
//   return data;
// }
// let num = 5;
// // 显示页面帖子
// showPosts();
// // show posts in DOM
// function showPosts() {
//   // const posts = await getPosts();
//   //   console.log(posts);
//   let posts = data.slice(num - 5, num);

//   posts.forEach((post) => {
//     const postEl = document.createElement("div");
//     postEl.classList.add("post");
//     postEl.innerHTML = `
//         <div class="number">${post.id}</div>
//         <div class="post-info">
//         <h2 class="post-title">${post.title}</h2>
//         <p class="post-body">${post.body}</p>
//         </div>
//         `;
//     postsContainer.appendChild(postEl);
//   });
// }

// //showLoading
// function showLoading() {
//   loading.classList.add("show");
//   setTimeout(() => {
//     loading.classList.remove("show");

//     setTimeout(() => {
//       // page++;
//       num += 5;
//       showPosts();
//     }, 300);
//   }, 1000);
// }

// // filterPosts
// function filterPosts(e) {
//   const term = e.target.value.toUpperCase();
//   const posts = document.querySelectorAll(".post");

//   posts.forEach((post) => {
//     const tilte = post.querySelector(".post-title").innerText.toUpperCase();
//     const body = post.querySelector(".post-body").innerText.toUpperCase();

//     if (tilte.indexOf(term) > -1 || body.indexOf(term) > -1) {
//       post.style.display = "flex";
//     } else {
//       post.style.display = "none";
//     }
//   });
// }

// // 事件监听
// window.addEventListener("scroll", () => {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     showLoading();
//   }
// });

// filter.addEventListener("input", filterPosts);
