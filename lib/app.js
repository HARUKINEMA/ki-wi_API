"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var data = __importStar(require("./drinking_machine.json"));
var app = (0, express_1.default)();
var router = express_1.default.Router();
var dataList = [];
for (var key in data.machines) {
    dataList.push(data.machines[key]);
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
router.get("/hello", function (req, res) {
    res.send("HelloWorld" + req.query.lat + " " + req.query.lng + "\n");
});
router.post("/machine", function (req, res) {
    var reqDataJson = {
        "location": [Number(req.query.lat), Number(req.query.lng)]
    };
    res.send(reqDataJson);
    dataList.push(reqDataJson);
    var machineData = JSON.stringify({ "machines": dataList }, null, ' ');
    fs.writeFileSync('./lib/drinking_machine.json', machineData);
});
app.use("/api", router);
// 3000番ポートでAPIサーバ起動
app.listen(3000, function () {
    console.log("Listening on port 3000...");
});
