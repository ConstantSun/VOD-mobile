import React from 'react';
import axios from 'axios';
import './VideoList.css';
export default class VideoList extends React.Component {
  state = {
    videos: []
  }

  componentDidMount() {
    axios.get(`https://yhd9zfpvc9.execute-api.us-east-1.amazonaws.com/test/getVidList`)
      .then(res => {
        const videos = res.data;
        console.log("videos:\n", videos)
        this.setState({ videos });
      })
  }

  render() {
    return (
        <div class="center">
        {
          this.state.videos
            .map(video =>
                    <a href={video.HLSURL}> 
                        <img class="fit"
                            src={video.ThumbNail}
                            alt="dm"
                        />
                    </a>
            )
        }
        </div>
    )
  }
}