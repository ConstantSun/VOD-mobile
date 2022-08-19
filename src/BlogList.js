import { Link } from "react-router-dom"

const BlogList = ({videos, title, handleDelete}) => {
    return (
        <div>
            <h2>{title}</h2>
            {videos.map(
                (video)=>(
                    <div className="blog-preview" key={video.id}>
                        <Link to={`/blog/${video.id}`}>
                            <h2> {video.name} </h2>
                            <p> Uploaded time {video.dateUpload}</p>
                            <img class="fit"
                                src={video.ThumbNail[0]}
                                alt="dm"
                            />
                        </Link>
                    </div>
                )
            )}
        </div>
    )
}

export default BlogList
