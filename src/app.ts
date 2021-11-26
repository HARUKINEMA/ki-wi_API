import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";

const app: express.Express = express();
const router: express.Router = express.Router();
const dataList: { "location": number[] }[] = [];

for (let key in data.machines){
  dataList.push(data.machines[key]);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/hello", (req: express.Request, res: express.Response) => {
  res.send("HelloWorld" + req.query.lat + " " + req.query.lng + "\n");
});

router.post("/machine", (req: express.Request, res: express.Response) => {
  const reqData = {
    "location": [Number(req.query.lat), Number(req.query.lng)]
  };
  res.send(reqData);
  dataList.push(reqData);
  const machineData = JSON.stringify({"machines": dataList}, null, ' ')
  fs.writeFileSync('./lib/drinking_machine.json', machineData);
});

app.use("/api", router);

// 8000番ポートでAPIサーバ起動
app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
