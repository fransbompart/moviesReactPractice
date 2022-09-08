import { MovieCard } from "./MovieCard";
import { Spinner } from "../components/Spinner";
import styles from "./MoviesGrid.module.css";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient"
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "./Empty";

export function MoviesGrid({search}) {
    const [movies, setMovies] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useEffect( () => {
        setIsLoading(true);
        const searchUrl = search 
                            ? "/search/movie?query=" + search + "&page=" + page
                            : "/discover/movie?page=" + page;

        get(searchUrl).then( (data) => {
            setMovies((prevMovies) => prevMovies.concat(data.results))
            setIsLoading(false);
            setHasMore( data.page < data.total_pages)
        });
    }, [search, page]);

    //con el arreglo de dependencias evitamos que el efecto se ejecute multiples veces
    //se va a ejecutar solo la primera vez que sea renderizado el componente en el DOM
    //ya que el arreglo tiene un parametro hara que se ejecute el efecto cada vez que el parametro se actualice
    //en este caso cada vez que search se actualice la busqueda 

    if (!isLoading && movies.length === 0){
        return <Empty/>
    }

    return(
        <InfiniteScroll 
            dataLength={movies.length}
            hasMore={hasMore}
            next={() => setPage((prevPage) => prevPage + 1)}
            loader={<Spinner/>}
        >

            <ul className={styles.moviesGrid}>
                {movies.map( (movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </ul>
        </InfiniteScroll>
    );
}