import ffmpegStatic from "ffmpeg-static"; 
import ffmpeg from "fluent-ffmpeg";

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);

// function to extract audio from video given the path
function extractAudio(inputVidPath: string, outputFilePath: string) {
    return new Promise((resolve, reject) => {
        // run ffmpeg
        ffmpeg()
        // input video path
        .input(inputVidPath)
        // set bit rate of the audio
        .outputOptions('-ab', '192k')
        // output file path
        .saveToFile(outputFilePath)

        // log the percentage of progress reported
        .on('progress', (progress: { percent: number; }) => {
            if (progress.percent) {
              console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        })

        // The callback that is run when FFmpeg is finished
        .on('end', () => {
            console.log('FFmpeg has finished.');
        })

        // If there is an error, run following callback
        .on('error', (error: Error) => {
            console.error(error);
        });
    });
}

extractAudio('src/TEST_VIDEO.mp4','extractingAudio.mp3')