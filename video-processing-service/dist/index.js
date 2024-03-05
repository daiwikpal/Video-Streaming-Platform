"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/status", (req, res) => {
    const port = process.env.PORT || 3001;
    res.status(200).send(`Video Process Running on port: ${port}`);
});
app.post("/processVideos", (req, res) => {
    fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
    const inputPath = req.body.inputFilePath;
    const outputPath = req.body.outputFilePath;
    console.log(inputPath, outputPath);
    if (!inputPath || !outputPath) {
        res.status(400).send("Bad Request: Missing File Path");
    }
    (0, fluent_ffmpeg_1.default)()
        // Input file
        .input(inputPath)
        // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
        // exact size of the other dimension. In other words, to make the video 720 pixels wide
        // and make FFmpeg calculate its height, use scale=720:-2 instead.
        .outputOptions('-vf', 'scale=-1:360', '-c:a', 'copy')
        // Output file
        .saveToFile(outputPath)
        // Log the percentage of work completed
        .on('progress', (progress) => {
        if (progress.percent) {
            console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
    })
        // The callback that is run when FFmpeg is finished
        .on('end', () => {
        console.log('FFmpeg has finished.');
        res.status(200).send("Process finished successfully");
    })
        // The callback that is run when FFmpeg encountered an error
        .on('error', (error) => {
        console.error(`An error occured: ${error.message}`);
        res.status(500).send(`Internal server error: ${error.message}`);
    });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
