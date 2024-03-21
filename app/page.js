import Link from 'next/link';




export default function Home() {
  return (
    
      <div >
        <h1>Hola mundo</h1>
        <Link href="/products/create">
            <h1>Crear Producto</h1>
          </Link>
      </div>

  );
}
