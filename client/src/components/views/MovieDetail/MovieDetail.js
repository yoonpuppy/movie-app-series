// #7
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
// #7 10:50 MainImage 도 commons 에 들어가는 게 맞다 (여러군데에서 쓰이기 때문에)
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {

    // #7 4:00 movieId 가져오는 법
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([]) // array 니까 []

    // #7 2:40 useEffect 설명
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        // #7 3:00 endpoint 넣어줌
        fetch(endpointInfo)
            .then(response => response.json()) // 이거 해야 정보를 제대로 볼 수 있음
            .then(response => {
                console.log(response)
                setMovie(response.results)
            })


    }, [])
 
 
    // #7 9:00 렌더링하는 부분
    
    return (
        <div>


            {/* header */}
            {/* Header 부분 MainImage 를 LandingPage.js 에서 가져오기 */}
            
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}        
            />


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                {/* Movie Info */}
                {/* #7 12:00 MovieInfo.js */}
                <MovieInfo 
                    movie={ Movie }
                />

                <br />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button> Toggle Actor View </button>
                </div>

            </div>

        </div>
    )
}

export default MovieDetail
