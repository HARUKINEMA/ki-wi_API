import express from 'express'

const app: express.Express = express()
const router: express.Router = express.Router()

router.get('/api/hello', (req:express.Request, res:express.Response) => {
  res.send("HelloWorld" + req.query.lat +" "+ req.query.lng)
})

app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(3000,()=>{ console.log('Listening on port 3000...') })
