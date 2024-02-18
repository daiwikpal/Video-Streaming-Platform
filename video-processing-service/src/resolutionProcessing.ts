

import ffmpegStatic from "ffmpeg-static"; 
import ffmpeg from "fluent-ffmpeg";

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);
function createLowerResVideo(inputPath: string, outputPath: string) {

    return new Promise((resolve, reject) => {
        // Run FFmpeg
        ffmpeg()

            // Input file
            .input(inputPath)

            // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
            // exact size of the other dimension. In other words, to make the video 720 pixels wide
            // and make FFmpeg calculate its height, use scale=720:-2 instead.
            .outputOptions('-vf', 'scale=-2:720')

            // Output file
            .saveToFile(outputPath)

            // Log the percentage of work completed
            .on('progress', (progress: { percent: number; }) => {
                if (progress.percent) {
                    console.log(`Processing: ${Math.floor(progress.percent)}% done`);
                }
            })

            // The callback that is run when FFmpeg is finished
            .on('end', () => {
                console.log('FFmpeg has finished.');
            })

            // The callback that is run when FFmpeg encountered an error
            .on('error', (error: Error) => {
                console.error(error);
            });
    })

}

createLowerResVideo('src/TEST_VIDEO.mp4','lowerRez.mp4')
