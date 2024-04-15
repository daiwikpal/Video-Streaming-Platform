// This file keeps track of googel cloud storate file ineraction 
// and local file interactions 
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from "ffmpeg-static";
import { register } from 'module';


const storage = new Storage();
const rawVideoBucket = "video-streaming-platform-raw-videos";
const processedVideoBucket = "video-streaming-platform-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local diretories for raw and processed videos
 */
export function setUpDirectories() {
    validateDirectoryExists(localRawVideoPath);
    validateDirectoryExists(localProcessedVideoPath);
}

/**
 * 
 * @param rawVideoPath the name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoPath the name of the file to conver to {@link localProcessedVideoPath}
 * @returns A promise that resolves when the video is converted
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg.setFfmpegPath(ffmpegStatic as string);
        ffmpeg()
        // Input file
        .input(`${localRawVideoPath}/${rawVideoName}`)

        // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
        // exact size of the other dimension. In other words, to make the video 720 pixels wide
        // and make FFmpeg calculate its height, use scale=720:-2 instead.
        .outputOptions('-vf', 'scale=-1:360', '-c:a', 'copy')

        // Output file
        .saveToFile(`${localProcessedVideoPath}/${processedVideoName}`)
        // Log the percentage of work completed
        .on('progress', (progress: { percent: number; }) => {
            if (progress.percent) {
                console.log(`Processing: ${Math.floor(progress.percent)}% done`);
            }
        })
        // The callback that is run when FFmpeg is finished
        .on('end', () => {
            console.log('FFmpeg has finished.');
            resolve();  
            // res.status(200).send("Process finished successfully");
        })

        // The callback that is run when FFmpeg encountered an error
        .on('error', (error: Error) => {
            console.error(`An error occured: ${error.message}`);
            reject(error);
            // res.status(500).send(`Internal server error: ${error.message}`);
        });
    });
}
/**
 * 
 * @param videoName The name of the video to download from the {@link rawVideoBucket} into {@link localRawVideoPath} 
 * @returns A promise that resolves when the video is downloaded
 */ 
export async function downloadRawVideoFromGCS(videoName: string) {
    await storage.bucket(rawVideoBucket)
        .file(videoName)
        .download({destination: `${localRawVideoPath}/${videoName}`});

    console.log(`gs://${rawVideoBucket}/${videoName} downloaded to ${localRawVideoPath}/${videoName}`);
}


/**
 * @param videoName The name of the video to upload to GCS from {@link localProcessedVideoPath} 
 * into the {@link processedVideoBucket}
 * @returns A promise that resolves when the video is uploaded to GCS
 */
export async function uploadProcessedVideoToGCS(videoName: string){
    const bucket = storage.bucket(processedVideoBucket);
    await bucket.upload(`${localProcessedVideoPath}/${videoName}`, {
        destination: videoName,
    });

    console.log(`${localProcessedVideoPath}/${videoName} uploaded to gs://${processedVideoBucket}/${videoName}`);
    
    await bucket.file(videoName).makePublic();

    const [metadata] = await bucket.file(videoName).getMetadata();
    const publicURL = `https://storage.googleapis.com/${processedVideoBucket}/${videoName}`;
    const id = metadata.id;

    return { publicURL, id };

}


export function deleteLocalRawVideo(videoName: string){
    return deleteLocalFile(`${localRawVideoPath}/${videoName}`);
}

export function deleteLocalProcessedVideo(videoName: string){  
    return deleteLocalFile(`${localProcessedVideoPath}/${videoName}`);
}

/**
 * @param filePath The path of the file to delete
 * @returns A promise that resolves when the file is deleted
 */
function deleteLocalFile(filePath: string) {
    return new Promise<void>((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to delete file at ${filePath}`, err); 
                    console.error(`An error occured: ${err.message}`);
                    reject(err);
                } else {
                    console.log(`File deleted at ${filePath}`);
                    resolve();
                }
            }); 
        }else{
            console.log(`File not found at ${filePath}`);
            resolve();
        }
    }); 
} 

function validateDirectoryExists(directoryPath: string){
    if(!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath, {recursive: true});
        console.log(`Directory created at ${directoryPath}`);
    }
}
