import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(requests.requestPopular)
            .then((response) => {
                setMovies(response.data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const movie = movies[Math.floor(Math.random() * movies.length)];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (movie) {
        const truncateString = (str, num) => {
            if (str.length > num) {
                return str.slice(0, num) + "...";
            } else {
                return str;
            }
        }

        return (
            <div className="w-full h-[550px] text-white">
                <div className="w-full h-full">
                    <div className="absolute w-full h-[550px] bg-gradient-to-r from-black">
                        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                        <div className="absolute w-full top-[20%] pt-4 md:p-8">
                            <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
                            <div className="my-4">
                                <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
                                <button className="border  text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
                            </div>
                            <p className="text-gray-400 text-sm">Releasead:{movie.release_date}</p>
                            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{truncateString(movie.overview, 150)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>No movie found.</div>;
    }
}

export default Main;
