import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/CustomPagination/CustomPagination'
import Genres from '../../components/Genres'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenres from '../../useGenre'

const Movies = () => {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([])
    const genreForURL = useGenres(selectedGenres)

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
        )

        setContent(data.results)
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreForURL])

    return (
        <div>
            <span className="pageTitle"> Tv-Series
            </span >
            <Genres
                setPage={setPage}
                genres={genres}
                setGenres={setGenres}
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />
            <div className="trending">
                {
                    content && content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type='tv'
                            vote_average={item.vote_average}
                        />
                    ))
                }
            </div>
            {
                numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            }

        </div>
    )
}

export default Movies
