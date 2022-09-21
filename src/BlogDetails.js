import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
// import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactHlsPlayer from 'react-hls-player';
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams();
    const [agree, setAgree] = useState(0)
    const [disag, setDisag] = useState(0)
    const [linkVid, setLinkVid] = useState(null)
    const {data: video, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}?videoid=" + id, localStorage.getItem('access_tk'))
    // const history = useHistory();
    console.log("\nBlog details: access_tk")
    console.log(localStorage.getItem('access_tk'))




    const requestOptions = {
        method: 'POST',
        headers: { 
            'Access-Control-Allow-Headers' : 'Origin, Authorization',
            'Access-Control-Allow-Origin' : '*',
            'Authorization': localStorage.getItem("access_tk") ,
            // 'Access-Control-Allow-Credentials' : true,
            // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
            // 'Content-Type' : 'text/plain;charset=UTF-8',

        },
        body: {
                    videoid: id,
                    userRes: "yes"
                }
    };
    fetch('https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote', requestOptions)
    .then(response => console.log(response.json()))
    .then(data => this.setState({ postId: data.id }));




    


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
        video.numOfAgreementsToReplay = video.numOfAgreementsToReplay + 1
        document.getElementById('yes_choice').innerText = video.numOfAgreementsToReplay
        const testVar = localStorage.getItem('access_token')
        const ans = "yes"

        // axios.post("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote", null, 
        //     { 
        //     params:  
        //         {
        //             "videoid": id,
        //             "userRes": "yes",
        //             "access_tk": localStorage.getItem("access_tk")
        //         }
        //     })
        // .then((res)=>{
        //     console.log("voting saved")
        //     console.log(res.data)
        // })



        // data to be sent to the POST request
        // let _data = {
        //     title: "foo",
        //     body: "bar", 
        //     userId:1
        // }
        
        // fetch('https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote', {
        //     method: "POST",
        //     body: {
        //         "videoid": id,
        //         "userRes": "yes",
        //         "test" : testVar
        //     },
        //     headers: {'Authorization': testVar}
        // })
        // .then(response => response.json()) 
        // .then(json => console.log(json));

        // axios.post("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote",null, {
        //                 params:
        //                 {
        //                     videoid: id,
        //                     userRes: "yes",
        //                     access_tk : localStorage.getItem("access_tk")
        //                 }
        //             })
        // .then((res)=>{
        //     console.log("voting saved")
        //     console.log(res.data)
        //     // history.push("/")
        // }) 
        
        
        // Send a POST request
        // axios({
        //     method: 'post',
        //     url: 'https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote',
        //     body: {
        //         videoid: id,
        //         userRes: "yes"
        //     },
        //     headers: {
        //         'authorization': localStorage.getItem("access_tk")
        //     }
        // });     

        
        // axios.post('https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote', 
        //     {
        //                     videoid: id,
        //                     userRes: "yes"
        //     }
        //     ,
        //     {headers: {
        //         'authorization': localStorage.getItem("access_tk")
        //             }
        //     },)
        //     .then((response) => {
        //         console.log(response.data);
        //     });


        const requestOptions = {
            method: 'POST',
            headers: { 
                'Access-Control-Allow-Headers' : 'Origin, Authorization',
                'Access-Control-Allow-Origin' : '*',
                'Authorization': localStorage.getItem("access_tk") ,
                // 'Access-Control-Allow-Credentials' : true,
                // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
                // 'Content-Type' : 'text/plain;charset=UTF-8',

            },
            body: {
                        videoid: id,
                        userRes: "yes"
                    }
        };
        fetch('https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote', requestOptions)
        .then(response => console.log(response.json()))
        .then(data => this.setState({ postId: data.id }));


        // let data = {
        //     videoid: id,
        //     userRes: "yes"
        // };
        // console.log(localStorage.getItem("access_tk"));
        // let headers = {
        //     Authorization: localStorage.getItem("access_tk")
        // };
        // let resultApi =  $.ajax({
        //         cache: false,
        //         type: "POST",
        //         url:  "https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote",
        //         headers: headers,
        //         data: data
        // });
        // console.log(resultApi);        

    }
    const handleNo = () => {
        video.numOfDisagreementsToReplay = video.numOfDisagreementsToReplay + 1
        document.getElementById('no_choice').innerText = video.numOfDisagreementsToReplay
        axios.post("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids/{vidId}/vote", null, 
            { 
            params:  
                {
                    "videoid": id,
                    "userRes": "no"
                }
            })
        .then((res)=>{
            console.log("voting saved")
            console.log(res.data)
        })
    }

    async function  handleDownload(){

        let presignedUrl = await axios.get("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/upload/genUrl",{
            params: {
                "access_tk": localStorage.getItem('access_tk'),
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
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate("/");
    }
    return ( 
        <div className="blog-details" >
            {isLoading && <div> Loading ... </div>}
            {error && <div> Err :  {error} , try <button onClick={handleLogin}>Log in</button> </div>}
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
                    <p>Do you wanna replay the match ? TEST 2</p>
                    <button onClick={handleYes}>Yes</button> 
                    <button onClick={handleNo}>No</button>

                    {/* <button onClick={handleClick}>Delete</button> */}
                </article>
            )}

        </div>
     );
}
 
export default BlogDetails;
