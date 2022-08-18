// Custom Hook file needs to start with 'use' word
import { useState, useEffect } from "react"
const useFetch = (url) => {
    console.log("URL : ", url)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(() => {
                fetch(url
                    , {signal: abortCont.signal}
                    )
                .then(res => {
                    if (!res.ok){
                        setError(true)
                        throw Error("could not fetch the data for that resource")
                    }
                    console.log("Res: ", res)
                    return res.json();
                })
                .then(data => {
                    if (!data.body) {
                        setData(data)
                        console.log("link video : ",data.hlsUrl)
                    }
                    else
                        setData(data.body)
                        console.log("link video : ",data.body.hlsUrl)


                    setIsLoading(false)
                    setError(null)

                    
                })
                .catch(err=>{
                    if (err.name === "AbortError") {
                        console.log('fetch aborted')
                    }
                    else{
                        setIsLoading(false)
                        setError(err.message)
                    }

                });
        }, 0);
        return () => abortCont.abort();
    }, [url])   
    
    return {data, isLoading, error}
}

export default useFetch
