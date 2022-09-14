import BlogList from './BlogList'
import Create from './Create'
import useFetch from './useFetch'
import { useNavigate } from "react-router-dom";

export default function Home({access_gb,setAcc_gb}) {

    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("access_token")
    // console.log("ACCESS_TOKEN: ")
    // console.log(searchParams.get("access_token")); 
    var access_tk = access_gb
    if(access_tk == "init"){
        console.log("Full url: ", window.location.href)
        const fullUrl = window.location.href
        const start = fullUrl.indexOf("access_token")+13
        const end = fullUrl.substring(start).indexOf("&")
        access_tk = fullUrl.substring(start, start + end) 
        console.log("Access token -----: ", access_tk)
        setAcc_gb(access_tk) ;    
    }
    else{
        console.log("access_tk:", access_tk)
    }

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/create");
    }
    
    const {data: blogs, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids", access_tk)
    return ( 
        <div className="home">
            <p>ver 3</p>
            {error && <div>{error}</div>}

            {isLoading && <div> Loading ... </div>}
            {  blogs &&  <BlogList videos ={blogs} title="All videos" />}

            {/* <a href="/create">Click to create video</a>  */}
            {/* <button onClick={handleClick}>Click to create video</button> */}
            
            {/* <BlogList blogs ={blogs.filter((blog)=> blog.author === 'Thi')} title="Thi's blog" handleDelete={handleDelete} /> */}
            {/* <button onClick={()=>{setName("Nguyen Trai")}}>Change name</button>
            <p>{name}</p> */}
        </div>
     );
}
 
// export default Home;