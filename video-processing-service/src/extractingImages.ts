import ffmpegStatic from "ffmpeg-static"; 
import ffmpeg from "fluent-ffmpeg";

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);

function extractImages(inputVidPath: string, outputFilePath: string) {
    return new Promise((resolve, reject) => {
        ffmpeg()
        // Input file
        .input(inputVidPath)

        //Optional: Extract the frames at this frame rate
        .fps(10)

        // Output file format. Frames are stored as frame-001.png, frame-002.png, frame-003.png, etc.
        // failed to save images to a folder
        // .saveToFile(`${outputFilePath}/frame-%03d.png`)
        .saveToFile(outputFilePath)

        // Log the percentage of work completed
        .on('progress', (progress: { percent?: number }) => {
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

extractImages('src/TEST_VIDEO.mp4','frame-%03d.png')