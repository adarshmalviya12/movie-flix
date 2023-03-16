
import { Chip } from '@mui/material';
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
        setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id))
        setGenres([...genres, genre].sort((a, b) => a.name.localeCompare(b.name)));
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres);

    };

    useEffect(() => {
        fetchGenres()
        return () => {
            setGenres([])
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: '6px 0' }}>
            {
                selectedGenres && selectedGenres.map((genre) => (
                    <>
                        < Chip
                            style={{ margin: 4, boxShadow: "0 2px 4px black" }}
                            size="small"
                            color="primary"
                            key={genre.id}
                            label={genre.name}
                            clickable
                            onDelete={() => handleRemove(genre)}
                        />


                    </>
                ))
            }
            {
                genres && genres.map((genre) => (
                    <Chip
                        style={{ margin: 4, boxShadow: "0 2px 4px black", color: 'white' }}
                        size="small"
                        key={genre.id}
                        label={genre.name}
                        clickable
                        onClick={() => handleAdd(genre)}
                    />
                ))
            }
        </div>
    )
}

export default Genres

