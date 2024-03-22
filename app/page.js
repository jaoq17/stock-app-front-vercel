'use client'

// import Link from 'next/link';
import { useEffect, useState } from 'react'
import styles from '../styles/home.css'


const initialState = { name: '', price: 0 }  //linea de codigo cuando creo producto se limpien los campos de los input

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
    const [product, setProduct] = useState(initialState)
    const [products, setProducts] = useState([])


    const handleChange = (e) => {
        const inputValue = e.target.value   // los target es para acceder a los valores del input, el value accede a cada tecla digitada
        const inputName = e.target.name    // aqui el target accede al input con name="name" de lo que digite 
        setProduct({
            ...product,                    // express operator permite guarda un estado y continuar
            [inputName]: inputValue,
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()    // el evento preventDefault submit de boton siempre refresca la pagina, este codigo permite ese efecto
        try {
          const res = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),

        })
        const data = await res.json()    // ya no va, elimine el codigo de abajo..Es lo mismo que abajo, pero tiene un return implicito, para ahorar lineas de codigo
        setProduct(initialState)
        console.log({ data })
        const newProducts = [data.product, ...products]
        setProducts(newProducts)
        // fetchProducts()
        } catch (error) {
          console.log({ error })
        }                    
    }

    const fetchProducts = () => {
      fetch(`${baseUrl}/products`)
        .then((res) => res.json())
        .then(({ products }) => {
          setProducts(products)
        })
    }

    useEffect(() => {
      fetchProducts()
    }, []);

    return (
        <>
            <div className='container df jcsb'>
              < div className='df fdc'>
                <u>
                <h1 style={{ margin: "0.3rem"}}>Crear nuevo producto</h1>
                </u>
                <form>
                    <input 
                      type="text"
                      name="name"
                      className='onone'
                      value={product.name}
                      onChange={handleChange}
                    />
                    <input 
                      type="number" 
                      name="price"
                      className='onone'
                      value={product.price} 
                      onChange={handleChange}
                    />
                    <button className='cursorp' onClick={handleClick}>Crear producto</button>
                </form>
              </div>
              <div className='products-container'>
                {products.map(({ _id, name, price}) =>(
                  <div key={_id} className='product df aic jcsb p5 mb5 br5'>
                    <span>{name}</span>
                    <div className=' df fdc'>
                    <span>${price}</span>
                    <span 
                      style={{color: "red", cursor: 'pointer'}}
                      onClick={() => {
                        fetch(`${baseUrl}/products/${_id}`, { method: 'DELETE' })
                          .then((res) => res.json())
                          .then((data) =>{
                            console.log({ data })
                          })
                        }}
                      >
                      BORRAR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        </>
    );
}






// export default function Home() {
//   return (
    
//       <div >
//         <h1>Hola mundo</h1>
//         <Link href="/products/create">
//             <h1>Crear Producto</h1>
//           </Link>
//       </div>

//   );
// }
