import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";
import cors from "cors";

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

router.post("/api/machine", cors(corsOptions), (req: express.Request, res: express.Response) => {
  const reqData = {
    location: [Number(req.query.lat), Number(req.query.lng)],
  };
  res.send(reqData);
  dataList.push(reqData);
  const machineData = JSON.stringify({ machines: dataList }, null, " ");
  fs.writeFileSync("./lib/drinking_machine.json", machineData);
});

app.use("", router);

// 8000番ポートでAPIサーバ起動
app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
