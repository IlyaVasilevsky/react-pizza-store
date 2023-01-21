import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function FullPizza () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = React.useState([])
  
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63bef57b585bedcb36bbc728.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }  
    }
    fetchPizza()
  }, [])

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza