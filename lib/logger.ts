import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import path from "path"

const isProduction = process.env.NODE_ENV === "production"

// format log
const logFormat = winston.format.printf(({timestamp, level, message}) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`
})


// instance logger
export const logger = winston.createLogger({
    level: isProduction ? "info": "debug",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        isProduction ? winston.format.json(): logFormat
    ),
    transports: [
        // console for dev
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),

        // rotating file for info+ level
        new DailyRotateFile({
            filename: path.join("logs", "app-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d", // maksimal simpan 30 hari
            level: "info"
        }),

        // rotating file untuk error saja
        new DailyRotateFile({
            filename: path.join("logs", "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "10m",
            maxFiles: "30d", // maksimal simpan 30 hari
            level: "error"
        }),
    ]
})