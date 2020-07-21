import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
// #4
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
// #5 5:00
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

// #4 
function LandingPage() {

    // #4 7:00 
    const [Movies, setMovies] = useState([])
    // #4 10:30
    const [MainMovieImage, setMainMovieImage] = useState(null)
    // #6 3:45
    const [CurrentPage, setCurrentPage] = useState(0)

    // #4 3:00 API
    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        /*
        // #4 5:30
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
        }) */
        
        fetchMovies(endpoint)
        
    }, [])

    // #6
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(response => {
                console.log(response.results)
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    // #6 2:00
    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }
    
    
    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {/* #4 11:30 */}
            {MainMovieImage &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview} 
                />
            }
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                { /* #5 */}
                <Row gutter={[16, 16]}>

                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment  key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieId={movie.id}
                                movieName={movie.original_title}                        
                            />
                        </React.Fragment>
                    ))}
                </Row>
            

            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>                
                <button onClick={loadMoreItems}> Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
