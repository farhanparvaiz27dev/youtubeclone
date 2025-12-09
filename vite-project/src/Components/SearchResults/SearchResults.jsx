import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY } from "../../data";
import "./SearchResults.css";

const SearchResults = () => {
    const { query } = useParams();
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            setVideos(data.items || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [query]);

    return (
        <div className="search-results">
            <h2>Results for: {query}</h2>

            <div className="video-grid">
                {videos.map((item, index) => {
                    const videoId =
                        item?.id?.videoId ||
                        item?.id?.channelId ||
                        item?.id?.playlistId ||
                        null;

                    return (
                        <Link
                            to={`/video/${videoId}`}
                            key={index}
                            className="video-card"
                        >
                            <img
                                src={item.snippet.thumbnails.medium.url}
                                alt="thumbnail"
                            />
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchResults;
