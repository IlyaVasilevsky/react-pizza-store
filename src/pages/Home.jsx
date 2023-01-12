import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

function Home () {
    
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://63bef57b585bedcb36bbc728.mockapi.io/items').then(res => {
            return res.json()
        })
        .then(json => {
            setItems(json)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
        <div className="content__top">
            <Categories/>
            <Sort/>
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className="content__items">
            {
                isLoading
                ? [...new Array(10)].map((_, index) => <Skeleton key={index}/>)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
            }
        </div>
        </>
    )
}

export default Home