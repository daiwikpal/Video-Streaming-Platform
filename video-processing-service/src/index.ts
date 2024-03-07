import express from "express";
import ffmpegStatic from "ffmpeg-static"; 
import ffmpeg from "fluent-ffmpeg";
import { setUpDirectories, downloadRawVideoFromGCS, uploadProcessedVideoToGCS, convertVideo, deleteLocalRawVideo, deleteLocalProcessedVideo} from "./storage";

setUpDirectories();

const app = express(); 
app.use(express.json());


app.get("/status", (req, res)=>{  
  const port = process.env.PORT || 3000; 
  res.status(200).send(`Video Process Running on port: ${port}`); 
}); 


app.post("/processVideos", async (req, res) => {

  // standard method to make sure we receive a filename from cloud Pub/Sub
  let data; 
  try{
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    data = JSON.parse(message);
    if(!data.name){
      throw new Error('Invalid message payload');
    }
  }catch(err){
    console.error(err);
    return res.status(400).send('Bad Request: Missing filename'); 
  }

  const rawVideoName = data.name;
  const processedVideoName = rawVideoName.replace('.mp4', '-processed.mp4');

  // Downlaod the raw video from GCS
  await downloadRawVideoFromGCS(rawVideoName); 

  // Convert the video
  try{
    await convertVideo(rawVideoName, processedVideoName);
  }catch (err){
    await deleteLocalRawVideo(rawVideoName);
    await deleteLocalProcessedVideo(processedVideoName);
    console.error(err);
    return res.status(500).send('Internal Server Error: Video Processing Failed');
  }

  // Upload the processed video to GCS
  await uploadProcessedVideoToGCS(processedVideoName); 

  // Delete the local files used to process the video
  await deleteLocalRawVideo(rawVideoName);
  await deleteLocalProcessedVideo(processedVideoName);

  return res.status(200).send('Video Processed Successfully');
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 