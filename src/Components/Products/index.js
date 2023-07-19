import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import _orderBy from 'lodash/orderBy'
import PagingItem from './components/PagingItem'
import ProductItem from '../ProductItem'
import { ProviderApp } from '../../ProviderGlobal'


const Products = (props) => {

    const { dataProducts } = props
    const providerContext = useContext(ProviderApp)
    const { search } = providerContext
    const [numberRender, setNumberRender] = useState(0);
    const [productsRender, setProductsRender] = useState([])
    const [isActivepaging, setIsActivepaging] = useState(0)
    useEffect(() => {
        setProductsRender(dataProducts[numberRender])

    }, [dataProducts])
    console.log("eee===", dataProducts)
    useEffect(() => {
        const newProducts = dataProducts[numberRender] || []
        const newProduct = newProducts.filter(item => {
            const newName = item.name.toLocaleUpperCase()
            const NewVlue = search.toLocaleUpperCase()
            if (newName.includes(NewVlue)) {
                return true
            }
        })

        setProductsRender(newProduct)

    }, [search])



    const handleIcrementPaging = (index) => {
        setNumberRender(index)
        setProductsRender(dataProducts[index])
    }
    const handleSortProduct = (e) => {
        const value = e.target.value
        if (value === "hight-to-low") {
            const newProducts = _orderBy(productsRender, ["price"], ['asc', 'desc'])
            setProductsRender(newProducts)
        } else if (value === "low-to-hight") {
            const newProducts = _orderBy(productsRender, ["price"], ['desc', 'asc'])
            setProductsRender(newProducts)
        } else {
            setProductsRender(dataProducts[numberRender])
        }
    }
    return (
        <div className='products col-lr-1'>
            <div className='products-t dl-fl-between'>
                <div className='products-sort'>
                    <span> Sắp xếp theo </span>
                    <select className='orderby' id="sort" onChange={handleSortProduct}>
                        <option value="Latest">Mới nhất</option>
                        <option value="hight-to-low">Thứ tự : theo giá từ thấp đến cao</option>
                        <option value="low-to-hight">Thự tự : theo giá từ cao đến thấp</option>
                    </select>
                </div>
                <div className='paging'>
                    <ul className='page-numbers dl-fl'>
                        {
                            dataProducts.map((item, index) =>
                                <PagingItem key={index} title={index} active={isActivepaging == index ? "current" : ""} onSetActive={setIsActivepaging} onIcrementPaging={handleIcrementPaging}
                                />)
                        }


                    </ul>

                </div>
            </div>
            <div className='list-product'>
                {
                    productsRender ? productsRender.map(item => <ProductItem key={item.id} item={item} />) : []

                }

            </div>

        </div>
    )
}
export default Products