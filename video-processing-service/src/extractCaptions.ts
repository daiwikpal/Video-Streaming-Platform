// use ffmpeg to generate captions in a JSON file 
import ffmpegStatic from "ffmpeg-static"; 
import ffmpeg from "fluent-ffmpeg";

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic as string);

// function to generate captions from video given the path
function generateCaptions(inputVidPath: string, outputFilePath: string) {
    return new Promise((resolve, reject) => {
        // run ffmpeg
        ffmpeg()
        // input video path
        .input(inputVidPath)
        // specify the output format to be WebVTT (for captions)
        .outputOptions('-f', 'webvtt')
        // specify the language of the audio for better accuracy
        .outputOptions('-map', '0:a:0')
        .outputOptions('-ar', '16000')
        // specify the method to generate captions
        .outputOptions('-acodec', 'pcm_s16le')
        .outputOptions('-vn')
        // specify the automatic speech recognition engine to use, if available
        // .outputOptions('-asr_engine', 'google')
        // output file path
        .saveToFile(outputFilePath)

        // log the percentage of progress reported
        .on('progress', (progress: { percent: number; }) => {
            if (progress.percent) {
              console.log(`Generating Captions: ${Math.floor(progress.percent)}% done`);
            }
        })

        // The callback that is run when FFmpeg is finished
        .on('end', () => {
            console.log('FFmpeg has finished generating captions.');
            resolve('Captions generated successfully.');
        })

        // If there is an error, run following callback
        .on('error', (error: Error) => {
            console.error('Error generating captions:', error);
            reject(error);
        });
    });
}

// Example usage
generateCaptions('sampleVideo.mp4','generatedCaptions.vtt')
