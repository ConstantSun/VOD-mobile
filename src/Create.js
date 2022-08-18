import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [author, setAuthor] = useState('yoshi')
    const [isPosting, setIsPosting] = useState(false)
    const history = useHistory();
    const [file, setFile] = useState('');
     
    // Handles file upload event and updates state
    async function handleUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0].name)
        console.log("file name: ", file.name)

        let presignedUrl = await axios.get("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/upload/genUrl",{
            params: {
                "bucket_name": "presigned-test-00",
                "file_key": event.target.files[0].name,
                "expiry_time": 1000,
                "action": "upload"
            }
        })

        console.log("pre-signed url:")
        console.log(presignedUrl.data.url)
        await axios.put(presignedUrl.data.url, event.target.files[0])
            .then(function(res){
                console.log(res)
                console.log("success----------------------------------------")
            })
            .catch(function(err){
                console.log(err)
                console.log("eroooooooooooooooooooooooooooooo00000")
            }); 
        console.log("axios put done")


        // fetch(api, {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "multipart/form-data"
        //     },
        //     body: file
        //   })
        // .then((res) => {
        // console.log("success upload s3")
        // console.log(res)
        // })
        // .catch((err)=>{
        // console.log(err)
        // })
    }
      
    return ( 
        <div className="create">


            <input type="file" onChange={handleUpload} />
            <p>Filename: {file.name}</p>
            <p>File type: {file.type}</p>


            {/* <h2>Upload a new video</h2>
            <form >
                <label>Video title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />

                <label>Select video:</label>
                <input 
                    type="file"
                    required
                    id="fileInput"
                    onChange={onFileChange}
                /> */}




                {/* <h3> 
                File Upload using React! 
                </h3> 
                <div> 
                    <input type="file" onChange={onFileChange} /> 
                    <button onClick={onFileUpload}> 
                    Upload! 
                    </button> 
                </div>  */}

                {/* <label>Blog body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}>
                </textarea> */}

                {/* <label>Blog author: </label>
                <select
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                >
                    <option value="mario"> mario </option>
                    <option value="yoshi"> yoshi </option>
                </select> */}
                {/* { !isPosting && <button onClick={onFileUpload} >Click to start uploading</button>} */}
                { isPosting && <button disabled>Uploading video ... </button>}
                {/* <p>{selectedFile}</p> */}


            {/* </form> */}
        </div>
     );
}
 
export default Create;