import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';


function FavoritePage() {

    // #13 10:30 
        // 가져온 영화 정보 (console.log(response.data)) State에 넣기
        const [Favorites, setFavorites] = useState([])

    useEffect(() => {

        
        // #13 7:00
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


        
        
    }, [])



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

                {/* #13 11:40 */Favorites.map((favorite, index) => (
                    <tr key={index}>
                        
                        <td>{favorite.movieTitle}</td>
                        <td>{favorite.movieRunTime} mins</td>
                        <td><button>Remove</button></td>

                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
