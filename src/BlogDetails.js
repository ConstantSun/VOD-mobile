import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from "axios";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: video, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}?videoid=" + id)
    const history = useHistory();

    const handleClick = () => {
        fetch("http://localhost:8000/blogs/"+id, {
            method: 'DELETE'
        }).then(()=>{
            console.log("blog deleted")
            // setIsPosting(false)
            // history.go(-1)
            history.push("/")
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
            // setIsPosting(false)
            // history.go(-1)
            history.push("/")
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
            // setIsPosting(false)
            // history.go(-1)
            history.push("/")
        })
    }
    return ( 
        <div className="blog-details">
            {isLoading && <div> Loading ... </div>}
            {error && <div> {error} </div>}
            {video && (
                <article>
                    <h2> {video.name} </h2>
                    <p> Uploaded date {video.dateUpload}</p>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={video.hlsUrl}
                            width='100%'
                            height='70%'
                            controls={true}
                        />
                    </div>
                    <p>video.hlsUrl  : {video.hlsUrl}</p>
                    <p>Vote for replaying: {video.numOfAgreementsToReplay} people</p>
                    <p>Vote for non-replaying  : {video.numOfDisagreementsToReplay} people</p>
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
