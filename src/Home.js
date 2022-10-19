import BlogList from './BlogList'
import Create from './Create'
import useFetch from './useFetch'
import { useNavigate } from "react-router-dom";

export default function Home() {

    if(localStorage.getItem('access_tk') == "-" || localStorage.getItem('access_tk') == null){
        console.log("Full url: ", window.location.href)
        const fullUrl = window.location.href
        const start = fullUrl.indexOf("access_token")+13
        const end = fullUrl.substring(start).indexOf("&")
        let access_tk = fullUrl.substring(start, start + end) 
        
        console.log("Scan for Access token -----: ", access_tk)
        // setAcc_gb(access_tk) ;    
        localStorage.setItem('myCat', 'Tom');
        localStorage.setItem('access_tk', access_tk)
        console.log("length: ", localStorage.getItem('access_tk').length)
        const cat = localStorage.getItem('myCat');
        console.log("cat : ", cat)
    }
    else{
        console.log("access_tk: *", localStorage.getItem('access_tk') , "*")
    }

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/");
    }
    
    const {data: blogs, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/demo/getVids", localStorage.getItem('access_tk'))
    return ( 
        <div className="home">
            {error && <div>{error}, try <button onClick={handleClick}>Log in</button> </div>}

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