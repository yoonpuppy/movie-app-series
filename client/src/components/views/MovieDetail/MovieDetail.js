// #7
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
// #7 10:50 MainImage 도 commons 에 들어가는 게 맞다 (여러군데에서 쓰이기 때문에)
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
// #9 7:30
import Favorite from './Sections/Favorite';
// #8 4:45 
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function MovieDetail(props) {

    // #7 4:00 movieId 가져오는 법
    const movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([]) // array 니까
    // #8 영화 출연진 가져오기 
    // 2:44 State 생성
    const [Casts, setCasts] = useState([])
    // 9:00 userState
    const [ActorToggle, setActorToggle] = useState(false)

    // #7 2:40 useEffect 설명
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        // #7 3:00
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                
            });


        // #8 3:00
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew', response)
                setCasts(response.cast)
                
            })
        
        
    }, [])
    
    // #8 10:00 onclick
    const toggleActorView = () => {
        setActorToggle(!ActorToggle) 
    }

    // #7 9:00 렌더링하는 부분
    
    return (
        <div>


            {/* header */}
            
            {Movie &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}        
                />
            }
            
            
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                {/* Favorite Button UI #9 6:00 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}  />
                </div>

                {/* Movie Info */}
                {/* #7 12:00 MovieInfo.js */}
                <MovieInfo 
                    movie={ Movie }
                />

                <br />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>

                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment  key={index}>
                                <GridCards
                                    
                                    image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
                

            </div>

        </div>
    )
}

export default MovieDetail
