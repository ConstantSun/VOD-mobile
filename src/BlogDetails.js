import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
// import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactHlsPlayer from 'react-hls-player';

const BlogDetails = ({access_tk_gb}) => {
    const {id} = useParams();
    const [agree, setAgree] = useState(0)
    const [disag, setDisag] = useState(0)
    const [linkVid, setLinkVid] = useState(null)
    const {data: video, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}?videoid=" + id)
    // const history = useHistory();
    console.log("\nBlog details: access_tk_gb")
    console.log(access_tk_gb)

    const handleClick = () => {
        fetch("http://localhost:8000/blogs/"+id, {
            method: 'DELETE'
        }).then(()=>{
            console.log("blog deleted")
            // setIsPosting(false)
            // history.go(-1)
            // history.push("/")
        })
    }
    const handleYes = () => {
          axios.post("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote", null, { 
            params: 
                    {
                        "videoid": id,
                        "userRes": "yes"
                    }
                })
        .then(()=>{
            console.log("voting saved")
            video.numOfAgreementsToReplay = video.numOfAgreementsToReplay + 1
            document.getElementById('yes_choice').innerText = video.numOfAgreementsToReplay

            // history.push("/")
        })
    }
    const handleNo = () => {
            axios.post("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote", null, { 
                params:  
                    {
                        "videoid": id,
                        "userRes": "no"
                    }
                })
        .then(()=>{
            console.log("voting saved")
            video.numOfDisagreementsToReplay = video.numOfDisagreementsToReplay + 1
            document.getElementById('no_choice').innerText = video.numOfDisagreementsToReplay
        })
    }

    async function  handleDownload(){

        let presignedUrl = await axios.get("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/upload/genUrl",{
            params: {
                "access_tk": access_tk_gb,
                "bucket_name": "vod-serverless-v3-source-1e9fcxg7h46rp",
                "file_key": video.name,
                "expiry_time": 1000,
                "action": "get_object"
            }
        })

        console.log("pre-signed url:")
        console.log(presignedUrl.data.url)
        setLinkVid(presignedUrl.data.url)
    }
    return ( 
        <div className="blog-details" >
            {isLoading && <div> Loading ... </div>}
            {error && <div> Err :  {error} </div>}
            {video && (
                <article>
                    <h2> {video.name} </h2>
                    <p> Uploaded date {video.dateUpload}</p>
                    <div className='player-wrapper'>
                        <ReactHlsPlayer
                            className='react-player'
                            src={video.hlsUrl}
                            width='100%'
                            height='70%'
                            controls={true}
                            
                        />
                    </div>
                    {/* <p>src link: {video.hlsUrl}</p> */}
                    <button onClick={handleDownload}>Get link to download video</button>
                    {linkVid && <a href={linkVid} download>Click to download</a>}

                    <p>Vote for replaying: <text id="yes_choice">{video.numOfAgreementsToReplay}</text>  people</p>
                    <p>Vote for non-replaying  : <text id="no_choice"> {video.numOfDisagreementsToReplay}</text> people</p>
                    <br>
                    </br>
                    <p>Do you wanna replay the match ?</p>
                    <button onClick={handleYes}>Yes</button> 
                    <button onClick={handleNo}>No</button>

                    {/* <button onClick={handleClick}>Delete</button> */}
                </article>
            )}

        </div>
     );
}
 
export default BlogDetails;
