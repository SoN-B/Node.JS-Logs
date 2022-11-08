const express = require("express");
const path = require("path"); // 파일 경로 모듈
require("dotenv").config({ path: path.join(__dirname, "./env/server.env") }); //env 로드 모듈

const logger = require("./winston");
const morgan = require("morgan");
const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; // NOTE: morgan 출력 형태
const app = express();

const port = process.env.PORT || 5000;

app.use(morgan(morganFormat, { stream: logger.stream })); // morgan 로그 설정

app.get("/test/info", (req, res, next) => {
    logger.info("info test");
    res.status(200).send({
        message: "info test!",
    });
});

app.get("/test/warn", (req, res, next) => {
    logger.warn("warning test");
    res.status(400).send({
        message: "warning test!",
    });
});

app.get("/test/error", (req, res, next) => {
    logger.error("error test");
    res.status(500).send({
        message: "error test!",
    });
});

app.listen(port, () => logger.info(`Server Start Listening on port ${port}`));
