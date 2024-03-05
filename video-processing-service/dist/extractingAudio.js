"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
// Tell fluent-ffmpeg where it can find FFmpeg
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
// function to extract audio from video given the path
function extractAudio(inputVidPath, outputFilePath) {
    return new Promise((resolve, reject) => {
        // run ffmpeg
        (0, fluent_ffmpeg_1.default)()
            // input video path
            .input(inputVidPath)
            // set bit rate of the audio
            .outputOptions('-ab', '192k')
            // output file path
            .saveToFile(outputFilePath)
            // log the percentage of progress reported
            .on('progress', (progress) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        })
            // The callback that is run when FFmpeg is finished
            .on('end', () => {
            console.log('FFmpeg has finished.');
        })
            // If there is an error, run following callback
            .on('error', (error) => {
            console.error(error);
        });
    });
}
extractAudio('src/TEST_VIDEO.mp4', 'extractingAudio.mp3');
