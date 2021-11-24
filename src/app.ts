import express from "express";
import * as fs from "fs";
import * as data from "./drinking_machine.json";

const app: express.Express = express();
const router: express.Router = express.Router();
const listData: { lat: number; lng: number; }[] = [];

for (let key in data.machines){
  listData.push(data.machines[key]);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/hello", (req: express.Request, res: express.Response) => {
  res.send("HelloWorld" + req.query.lat + " " + req.query.lng + "\n");
});

router.post("/machine", (req: express.Request, res: express.Response) => {
  const reqDataJson = {
    lat: Number(req.query.lat),
    lng: Number(req.query.lng)
  };
  res.send(reqDataJson);
  //result.jsonObject = reqDataJson;
  listData.push(reqDataJson);
  const machineData = JSON.stringify({"machines": listData}, null, ' ')
  fs.writeFileSync('./lib/drinking_machine.json', machineData);
});

app.use("/api", router);

// 3000番ポートでAPIサーバ起動
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
