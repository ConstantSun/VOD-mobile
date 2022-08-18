import BlogList from './BlogList'
import useFetch from './useFetch'

const Home = () => {

    const {data: blogs, isLoading, error} = useFetch("https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/ts1/getVids")
    return ( 
        <div className="home">
            {error && <div>{error}</div>}

            {isLoading && <div> Loading ... </div>}
            {  blogs &&  <BlogList videos ={blogs} title="All videos" />}
            {/* <BlogList blogs ={blogs.filter((blog)=> blog.author === 'Thi')} title="Thi's blog" handleDelete={handleDelete} /> */}
            {/* <button onClick={()=>{setName("Nguyen Trai")}}>Change name</button>
            <p>{name}</p> */}
        </div>
     );
}
 
export default Home;