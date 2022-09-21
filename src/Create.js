import axios from "axios";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import { LinearProgress } from '@mui/material';
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const Create = () => {
    // const history = useHistory();
    const [progress, setProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false)
    const [file, setFile] = useState('');
    const [auth,setAuth] = useState("true");

    console.log("\n Create details: access_tk")
    console.log(localStorage.getItem('access_tk'))  
     
    // Handles file upload event and updates state
    async function handleUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0].name)
        console.log("file name: ", file.name)
        setIsSuccess(false)

        let presignedUrl = await axios.get("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/upload/genUrl",{
            params: {
                "access_tk": localStorage.getItem('access_tk'),
                "bucket_name": "vod-serverless-v3-source-1e9fcxg7h46rp",
                "file_key": event.target.files[0].name,
                "expiry_time": 1000,
                "action": "upload"
            }
        })
        if (presignedUrl.data.url == "null" || !presignedUrl.data.url){
            setAuth(null)
        }
        else
            setAuth("admin")
        console.log("pre-signed url:")
        console.log(presignedUrl.data.url)

        await axios.put(presignedUrl.data.url, event.target.files[0],{
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                setProgress(progress);
              },
            onDownloadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            console.log(progress);
            setProgress(progress);
            },
        })
            .then(function(res){
                console.log(res)
                console.log("success----------------------------------------")
                setIsSuccess(true)

            })
            .catch(function(err){
                console.log(err)
                console.log("eroooooooooooooooooooooooooooooo00000")
            }); 
        console.log("axios put done")

    }

    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate("/");
    }    
      
    return ( 
        <div className="create">
            {/* {!auth && <h2>You must be admin to upload video !</h2>}
            {auth && <h2>Upload a new video</h2> } */}
            <h2>Upload a new video</h2>
                
            {/* {auth &&     */}
                <form >
                    <label>Your video:</label>
                    <input type="file" onChange={handleUpload} />
                    {!auth && <h2>Error: You must be admin to upload video ! Try <button onClick={handleLogin}>Log in</button> </h2>}
                    <br></br>
                    <label>Video title: {file.name}</label> <br></br>
                    <label>Video type : {file.type}</label> <br></br>

                    { isSuccess ? (
                    <Box color='success.main' display="flex">
                        <CheckIcon color="success" />
                        <Typography>Video uploaded</Typography>
                    </Box>
                    ) : (
                    <>
                        <LinearProgress variant="determinate" value={progress} />
                    </>
                    )}
                </form>
            {/* } */}
        </div>
     );
}
 
export default Create;
