import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';
// #14 
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config'


function FavoritePage() {

    // #13 10:30 
    // 가져온 영화 정보 (console.log(response.data)) State에 넣기
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {

        
        fetchFavoritedMovie()


        
    }, [])

    // #14 9:40
    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {
                    // 가져온 영화 정보 확인
                    // console.log(response.data)
                    // Favorites State 에 영화 정보 넣기
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패')
                }
            })
    }

    // #14 3:00
    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                    
                }
            </div>

        )

        return <tr key={index}>
            
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>

        </tr>
    })

    // #14 5:00
    const onClickDelete = (movieId, userFrom) => {
        
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoritedMovie()
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })

    }


    return (
        <div stype={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>

                {renderCards}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
