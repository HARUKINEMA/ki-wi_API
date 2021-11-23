import express from 'express'
import * as fs from 'fs'


const app: express.Express = express()
const router: express.Router = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router.get('/hello', (req:express.Request, res:express.Response) => {
  res.send("HelloWorld" + req.query.lat +" "+ req.query.lng+ '\n')
})

router.post('/machine', (req:express.Request, res:express.Response) => {
  //const a = { "lat": req.query.lat, "lng": req.query.lng }
  const json_machine = JSON.stringify({ "lat": req.query.lat, "lng": req.query.lng });
  res.send(json_machine);
   fs.writeFileSync('./src/drinking_machine.json',json_machine)
})

app.use("/api", router)

// 3000番ポートでAPIサーバ起動
app.listen(3000,()=>{ console.log('Listening on port 3000...') })
