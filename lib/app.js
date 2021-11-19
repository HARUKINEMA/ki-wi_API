"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var router = express_1.default.Router();
router.get('/api/hello', function (req, res) {
    res.send("HelloWorld" + req.query.lat + " " + req.query.lng);
});
app.use(router);
// 3000番ポートでAPIサーバ起動
app.listen(3000, function () { console.log('Listening on port 3000...'); });
