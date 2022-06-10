const http =  require("http");
const querystring =  require('querystring')
//引入http资源
//跳用http.createServer()  用来创建服务
//设置一个监听的端口
//注意：不要设置已经使用，不能冲突
http.createServer(function(req,res){
    // request 是存放前端的请求信息=》请求方式和地址和参数
    // response 是存放返回给前端的内容

    //req 判断地址 =》获取参数=》查询数据
    // 数据 =》res
    // res.end()=>输出接口
    //res.write('456')
    res.setHeader("Content-type","application/json")
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); 

    if(req.method==="GET" && req.url==='/alex'){
        let mockData = {name:'alex',age:18};
        res.end(JSON.stringify(mockData) )
    }
    if(req.method==="GET" && req.url==='/cici'){
        let mockData = {name:'cici',age:19};
        res.end(JSON.stringify(mockData))
    }
    if(req.method === 'POST' && req.url==='/login'){
                let postData = '';
                let token = '';
                req.on('data',chunk =>{
                    postData += chunk.toString()
                    //token
                    token = 123;
                })

                req.on('end',()=>{
                    console.log(postData)
                    res.end(
                        JSON.stringify({'msg':'成功请求',token:token})
                    )
                })
            }

    console.log(req.url,req.method)
  
}).listen(7777)

