import React from "react";

import './App.css';

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";


function App() {
  function filechange(e){
    var file = e.target.files[0];
    var filename = file['name'];
    const target = { Bucket:process.env.REACT_APP_BUCKET_NAME, Key:process.env.REACT_APP_DIRECTORY_NAME+"/"+file.name, Body:file };
    const creds = {accessKeyId:process.env.REACT_APP_ACCESS_ID,secretAccessKey:process.env.REACT_APP_ACCESS_KEY};

    if (filename.endsWith('.zip')) {
      console.log('Uploading')
      console.log(process.env.REACT_APP_ACCESS_ID)
      console.log(process.env.REACT_APP_ACCESS_KEY)
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({
            region: process.env.REACT_APP_REGION,
            credentials: creds
          }),
          leavePartsOnError: false, // optional manually handle dropped parts

          params: target,
        });

        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });

        parallelUploads3.done();
      } catch (e) {
        console.log(e);
      }

    }

    }
  return (
    <>
      <div className="card">
        
        <div className="container">
          <h4><b>Upload Files</b></h4>
          <input type="file" onChange={filechange}/>
        </div>
      </div>
      
      
      
    </>
  );
}

export default App