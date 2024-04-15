import {getFunctions, httpsCallable} from 'firebase/functions'; 
import { app } from "./firebase"; 


const functions = getFunctions(app); 

const generateUploadURL = httpsCallable(functions, 'generateUploadURL')

export async function uploadVideo(file: File){

    const response: any = await  generateUploadURL({
        fileExtension: file.name.split('.').pop()
    }); 

    // Uploading the file using the signed URL

    await fetch(response?.data?.url,{
        method: 'PUT',
        body: file, 
        headers: {
            'Content-Type': file.type
        }
    }); 

    return; 
}

