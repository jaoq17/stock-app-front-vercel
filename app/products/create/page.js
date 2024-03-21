'use client'

import { useState } from 'react'
import styles from '../../../styles/screate.css'


const initialState = { name: '', price: 0 }  //linea de codigo cuando creo producto se limpien los campos de los input

export default function Create() {
    const [product, setProduct] = useState(initialState)

    const handleChange = (e) => {
        const inputValue = e.target.value   // los target es para acceder a los valores del input, el value accede a cada tecla digitada
        const inputName = e.target.name    // aqui el target accede al input con name="name" de lo que digite 
        setProduct({
            ...product,                    // express operator permite guarda un estado y continuar
            [inputName]: inputValue,
        })
        

    }

    const handleClick = (e) => {
        e.preventDefault()                        // el evento preventDefault submit de boton siempre refresca la pagina, este codigo permite ese efecto
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)

        }).then((res) => res.json())    // Es lo mismo que abajo, pero tiene un return implicito, para ahorar lineas de codigo
            // .then((res) => {
            //     return res.json()

            .then((data) => {
                setProduct(initialState)
                console.log('Producto creado con éxito!')
        })
            .catch( err => {
                console.log({ err })
        })
    }

    return (
        <>
            <div>
            <h1>Crear nuevo Producto</h1>
                <form>
                    <input type="text" name="name" value={product.name} onChange={handleChange}/>
                    <input type="number" name="price" value={product.price} onChange={handleChange}/>
                    <button onClick={handleClick}>Crear producto</button>
                </form>
            </div>

        </>
    );
}