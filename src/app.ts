import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";
import cors from "cors";
import https from "https";
import { exit } from "process";
import * as dotenv from "dotenv";

dotenv.config()
const ENV = process.env.REACT_ENV as string;
console.log(ENV)

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app: express.Express = express();
const router: express.Router = express.Router();
const dataList: { location: number[] }[] = [];

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

if (ENV!="TEST"){
  const privateKey = "/home/ubuntu/private.key"
  const certKey = "/home/ubuntu/certificate.crt"
  const ca = "/home/ubuntu/ca_bundle.crt"

  fs.open(privateKey, "r", (err,fd)=>{
    if(err){
      console.log("private-key error");
      exit(1)
    }
  })

  fs.open(certKey, "r", (err,fd)=>{
    if(err){
      console.log("private-key error");
      exit(1)
    }
  })

  fs.open(ca, "r", (err,fd)=>{
    if(err){
      console.log("private-key error");
      exit(1)
    }
  })
  
  const server = https.createServer({
    key: fs.readFileSync(privateKey),
    cert: fs.readFileSync(certKey),
    ca:fs.readFileSync(ca),
  }, app)
  server.listen(443, () => {
    console.log("start")
  })
}else{
  app.listen(443, ()=>{
    console.log("test server start")
  })
}

