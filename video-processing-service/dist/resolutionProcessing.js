"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
// Tell fluent-ffmpeg where it can find FFmpeg
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
function createLowerResVideo(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        // Run FFmpeg
        (0, fluent_ffmpeg_1.default)()
            // Input file
            .input(inputPath)
            // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
            // exact size of the other dimension. In other words, to make the video 720 pixels wide
            // and make FFmpeg calculate its height, use scale=720:-2 instead.
            .outputOptions('-vf', 'scale=-2:720')
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
        })
            // The callback that is run when FFmpeg encountered an error
            .on('error', (error) => {
            console.error(error);
        });
    });
}
createLowerResVideo('src/TEST_VIDEO.mp4', 'lowerRez.mp4');
