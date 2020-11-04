const Enw  = require ('../libs/application')
const Router = require('../middlewares/router')
const app = new Enw()
const router = new Router()

router.get('/',(ctx,next)=>{

})

app.use((ctx,next)=>{
    console.log('执行')
    setTimeout(()=>{
        next()
    },1000)
})

app.use((ctx,next)=>{
    console.log('1s后执行')
})

app.listen(3001,()=>{
    console.log("服务器启动了 3001")
})