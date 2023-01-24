import React from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizza, selectPizzaData } from "../redux/slices/pizzaSlice";
import { selectFilter } from "../redux/slices/filterSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizzaData)

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''
    dispatch(// @ts-ignore
     fetchPizza({category, sortBy, order, search, currentPage}))
  }

  React.useEffect(() =>{
    getPizzas()
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <>
    <div className="content__top">
      <Categories/>
      <Sort/>
    </div>
    <h2 className='content__title'>Все пиццы</h2>
    <div className="content__items">
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div> 
      ) : 
        (status === 'loading'
        ? [...new Array(10)].map((_, index) => <Skeleton key={index}/>)
        : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>))
      }
    </div>
    <Pagination currentPage={currentPage}/>
    </>
  )
}

export default Home