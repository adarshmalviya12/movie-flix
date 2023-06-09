import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import "./Trending.css"
import CustomPagination from '../../components/CustomPagination/CustomPagination'

const Trending = () => {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        // eslint-disable-next-line
        setContent(data.results)
    }

    useEffect(() => {
        fetchTrending();
    }, [page])

    return (
        <div>
            <span className="pageTitle"> Trending
            </span >
            <div className="trending">
                {
                    content && content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type={item.media_type}
                            vote_average={item.vote_average}
                        />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} numOfPages={10} />
        </div>
    )
}

export default Trending
