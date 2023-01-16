import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";

function Home () {
    const { categoryId , sort } = useSelector(state => state.filter)



    
    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`https://63bef57b585bedcb36bbc728.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then(res => {
            return res.json()
        })
        .then(json => {
            setItems(json)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <>
        <div className="content__top">
            <Categories />
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
        <Pagination onChangePage={(number => setCurrentPage(number))} />
        </>
    )
}

export default Home