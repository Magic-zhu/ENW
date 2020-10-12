const Enw  = require ('../libs/application')
const app = new Enw();


app.router('GET','/text',(req,res)=>{
    res.json({
        errcode:0
    })
})

app.listen(3001,()=>{
    console.log("服务器启动了 3001")
})