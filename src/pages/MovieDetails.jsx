import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieImg } from "../utils/getMovieImg";
import { get } from "../utils/httpClient"
import styles from "./MovieDetails.module.css";

export function MovieDetails() {
    const { movieId } = useParams();
    const [ movie, setMovie ] = useState(null);

    useEffect( () => {
        get("/movie/" + movieId).then( (data) => {
            setMovie(data);
        })
    }, [movieId]);

    if (!movie) 
        return null;

    const imageUrl = getMovieImg(movie.poster_path, 500);
    
    return (
        <div className={styles.detailsContainer}>
            <img 
                className={`${styles.col} ${styles.movieImage}`}
                src={imageUrl} 
                alt={movie.title}
            />
            <div className={` ${styles.col} ${styles.MovieDetails}`}>
                <p className={styles.firstItem}>
                    <strong>Title: </strong>{movie.title}
                </p>
                <p>
                    <strong>Description: </strong>{movie.overview}
                </p>
                <p>
                    <strong>Genres: </strong>
                    {movie.genres.map( (genre) => genre.name).join(", ")}
                </p>
            </div>
        </div>
    
    );
}