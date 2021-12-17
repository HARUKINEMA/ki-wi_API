import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";
import cors from "cors";
import https from "https";
import { exit } from "process";

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// var allowCrossDomain = function(req:any, res:any, next:any) {
//   if (req.headers.origin.endsWith('.herokuapp.com')) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   }
//   next();
// }
const privateKey = "/home/ubuntu/private.key"
const certKey = "/home/ubuntu/certificate.crt"

fs.open(privateKey, "r", (err,fd)=>{
  if(err){
    console.log("private-key error");
    exit(1)
  }
  console.log(fd.toString)
})

fs.open(certKey, "r", (err,fd)=>{
  if(err){
    console.log("private-key error");
    exit(1)
  }
  console.log(fd.toString)
})

const app: express.Express = express();
const router: express.Router = express.Router();
const dataList: { location: number[] }[] = [];
const server = https.createServer({
  key: fs.readFileSync(privateKey),
  cert: fs.readFileSync(certKey),
}, app)

//app.use(allowCrossDomain);

for (const key in data.machines) {
  dataList.push(data.machines[key]);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/api/machine", cors(), (req: express.Request, res: express.Response) => {
  const reqData = {
    location: [Number(req.query.lat), Number(req.query.lng)],
  };
  res.send(reqData);
  dataList.push(reqData);
  const machineData = JSON.stringify({ machines: dataList }, null, " ");
  fs.writeFileSync("./lib/drinking_machine.json", machineData);
});

app.use("", router);

// 80番ポートでAPIサーバ起動
server.listen(80, () => {
  console.log("start")
})
