import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import axios from "axios";

function Home () {
    const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(`https://63bef57b585bedcb36bbc728.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then(res => {
            setItems(res.data)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

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
        <Pagination currentPage={currentPage} />
        </>
    )
}

export default Home