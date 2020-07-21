import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

// #9 
function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // #12 5:00
    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }


    useEffect(() => {

        
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success) {
                } else {
                    alert('숫자 정보 가져오기 실패')
                }
            })

        // #11 1:00 , 5:00 State 에 넣기
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보 가져오기 실패')
                }
            })
        
    }, [])

    // #12 1:00 버튼 활성화
    const onClickFavorite = () => {
        
        // 이미 Favorite 이 돼있는지 안돼있는지, 조건에 따라 다른 req
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }

                })

        } else {

            Axios.post('/api/favorite/addFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        // ! -> true false 를 바꿔줌
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }

                })

        }


    }
    
    // #12 10:30 조건을 다르게 줘서 다른 문구를 보이게 하기
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite": "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite