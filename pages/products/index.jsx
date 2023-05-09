import axios from "axios";

// > Method ini berjalan disisi client
const Product = ({ products }) => {
  return (
    <>
      <h1>Product List</h1>
      {
        products.map((product) => {
          return (
            <ul key={ product.id }>
              <li>
                { product.nameProduct } - { product.priceProduct } - { product.categoryProduct }
              </li>
            </ul>
          )
        })
      }
    </>
  );
}

export default Product;

// 1.) getStaticProps
// > Untuk membuat SSG (Static Site Generation)
// => kita bisa membuat function getStaticProps().
// => getStaticProps digunakan bila menggunakan data eksternal (API).
// => Digunakan bila konten pada halama bergantung pada data eksternal.
// > Method ini berjalan disisi server
// > Penting
// # getStaticProps digunakan untuk membuat SSG. 
// # Dengan kata lain next js akan membuat static html dan static data dalam format json pada saat build time.
// # meskipun kita berkomunikasi dengan API.
// # Saat kita build ke production, kemudian kita ubah data API-nya data yang diproduction tidak akan berubah (tidak berkomunikasi langsung dengan API).
export const getStaticProps = async () => {
  // > Consume API
  const res = await axios('http://localhost:3004/products');
  const data = await res.data;
  // console.info(data, '=> Data dari server');

  // > Kondisi bila data tidak ditemukan
  if (!data) {
    return {
      notFound: true
    }
  }

  // > Kondisi bila data ditemukan
  return {
    props: {
      products: data
    }
  }
};