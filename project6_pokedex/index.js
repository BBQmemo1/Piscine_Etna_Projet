"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.get("/", function (req, res) {
    res.send("hello");
});
app.listen(port, function () {
    console.log("run nodedemon ".concat(port));
});
