'use client'

// import Link from 'next/link';
import { useEffect, useState } from 'react'
import styles from '../styles/home.css'
import Document from './document/page'


const initialProductState = { name: '', price: 0 }  //linea de codigo cuando creo producto se limpien los campos de los input
const initialMovementState = { type: "compra", quantity: 0 }

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
    const [selectedProductId, setSelectedProductId] = useState()
    const [product, setProduct] = useState(initialProductState)
    const [movement, setMovement] = useState(initialMovementState)
    const [products, setProducts] = useState([])


    const handleChange = (e) => {
        const inputValue = e.target.value   // los target es para acceder a los valores del input, el value accede a cada tecla digitada
        const inputName = e.target.name    // aqui el target accede al input con name="name" de lo que digite 
        setProduct({
            ...product,                    // express operator permite guarda un estado y continuar
            [inputName]: inputValue,
        })
    }


    const handleMovementChange = (e) => {
        const inputValue = e.target.value              // los target es para acceder a los valores del input, el value accede a cada tecla digitada
                                                       // aqui el target accede al input con name="name" de lo que digite 
        setMovement({    // yo cambie aqui el no
                ...movement,                     // express operator permite guarda un estado y continuar
            quantity: +inputValue,    // con ese + se convierte en entero el valor
        })
    }


    const handleSelectType = (type) => {
      // console.log({ type })
      setMovement({ ...movement, type })
    }


    const handleCreateProduct = async (e) => {
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
        setProduct(initialProductState)
        console.log({ data })
        const newProducts = [data.product, ...products]
        setProducts(newProducts)
        // fetchProducts()
        } catch (error) {
          console.log({ error })
        }                    
    }


    const handleCreateMovement = async (e) => {
        // e.preventDefault()    //  aqui no importa se puede sacar...el evento preventDefault submit de boton siempre refresca la pagina, este codigo permite ese efecto
        try {
          const res = await fetch(`${baseUrl}/products/movement/${selectedProductId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movement),

        })
        const data = await res.json()    // ya no va, elimine el codigo de abajo..Es lo mismo que abajo, pero tiene un return implicito, para ahorar lineas de codigo
        console.log({ data })
        setProduct(initialMovementState)
        setSelectedProductId(null)
        
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

    console.log({ products })

    return (
        <>
            <div className='container df jcsb'>
              < div className='df fdc'>
                
                <h2 style={{ margin: "0.3rem"}}>
                  <u>Crear nuevo producto</u>
                </h2>
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
                    <button className='cursorp' onClick={handleCreateProduct}>Crear producto</button>
                </form>


                {/* Formulario para Stock */}

                <h2 style={{ margin: "0.3rem"}}>
                  <u>Crear Movimiento Stock</u>
                  </h2>
                  <div className='df aic mb5'>
                    {["Compra", "Venta"].map( type =>(
                        <div
                          onClick={() => handleSelectType(type)}
                          className='shadow mr5 p5 br5 cursorp' 
                          key={type}
                            style={{ backgroundColor:
                                type === movement.type ? "lightblue" : "white"
                              }}
                          >
                          <span>{type}</span>
                        </div>
                      ))}
                  </div>
                    
                    <input 
                      type="number" 
                      name="quantity"
                      className='onone'
                      // value={movement.quantity} // aqui  dejo .price
                      defaultValue={movement.quantity}  // esto era para controlar el error, pero no funciona
                      onChange={handleMovementChange}
                    />
                    <button className='cursorp'
                    onClick={handleCreateMovement}>Crear movimiento de Stock</button>
                
              </div>
              <div className='products-container'>
                {products.map(({ _id, name, price}) =>(
                  <div 
                    onClick={() => setSelectedProductId(_id)}
                    key={_id}
                    className='shadow df aic jcsb p5 mb5 br5'
                    style={{
                      backgroundColor:
                        selectedProductId === _id ? 'lightblue' : 'white',
                        width: '100',

                    }}
                    >
                    <span>{name}</span>
                    <div className=' df aic'>
                    <span className='mr5'>${price}</span>
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
