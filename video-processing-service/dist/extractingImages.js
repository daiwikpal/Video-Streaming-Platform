"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
// Tell fluent-ffmpeg where it can find FFmpeg
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
function extractImages(inputVidPath, outputFilePath) {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)()
            // Input file
            .input(inputVidPath)
            //Optional: Extract the frames at this frame rate
            .fps(10)
            // Output file format. Frames are stored as frame-001.png, frame-002.png, frame-003.png, etc.
            // failed to save images to a folder
            // .saveToFile(`${outputFilePath}/frame-%03d.png`)
            .saveToFile(outputFilePath)
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
extractImages('src/TEST_VIDEO.mp4', 'frame-%03d.png');
