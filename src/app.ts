import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";
import cors from "cors";
import https from "https";
import { exit } from "process";
import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import {IsAllowExtension, SaveImage} from "./image";

dotenv.config();
const ENV = process.env.REACT_ENV as string;
console.log(ENV);

const app: express.Express = express();
const router: express.Router = express.Router();
const dataList: { location: number[] }[] = [];

for (const key in data.machines) {
  dataList.push(data.machines[key]);
}
app.use(bodyParser.json({limit: '50mb'})); // jsonをパースする際のlimitを設定
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post(
  "/api/machine",
  cors(),
  (req: express.Request, res: express.Response) => {
    const reqData = {
      location: [Number(req.query.lat), Number(req.query.lng)],
    };
    res.send(reqData);
    dataList.push(reqData);
    const machineData = JSON.stringify({ machines: dataList }, null, " ");
    fs.writeFileSync("./lib/drinking_machine.json", machineData);
  }
);

router.options('/api/image', cors(),(req:express.Request, res:express.Response)=>{
  console.log("AAAAAA")
})
router.post("/api/image", cors(),(req:express.Request, res:express.Response)=>{
  res.status(200)
  const data = req.body.data;
  const fileName = req.body.name;

  console.log(data)

  const isFile = IsAllowExtension(fileName)
  console.log(`isFIle = ${isFile}`)
  if (isFile){
    const ok = SaveImage(fileName, data)
    if (!ok){
      console.log("failed save")
      res.status(500)
      res.send("保存に失敗しました")
      return
    }
    console.log("success save")
    res.status(200)
    res.send("保存完了")
    return
  }
  res.status(400)
  res.send("対応している拡張子ではありません")
  return
})

app.use("", router);

if (ENV == "PRODUCT") {
  const privateKey = "/home/ubuntu/private.key";
  const certKey = "/home/ubuntu/certificate.crt";
  const ca = "/home/ubuntu/ca_bundle.crt";

  fs.open(privateKey, "r", (err) => {
    if (err) {
      console.log("private-key error");
      exit(1);
    }
  });

  fs.open(certKey, "r", (err) => {
    if (err) {
      console.log("private-key error");
      exit(1);
    }
  });

  fs.open(ca, "r", (err) => {
    if (err) {
      console.log("private-key error");
      exit(1);
    }
  });

  const server = https.createServer(
    {
      key: fs.readFileSync(privateKey),
      cert: fs.readFileSync(certKey),
      ca: fs.readFileSync(ca),
    },
    app
  );
  server.listen(443, () => {
    console.log("start");
  });
} else {
  app.listen(8080, () => {
    console.log("test server start");
  });
}
