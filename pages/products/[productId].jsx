import axios from "axios";
import { useRouter } from "next/router";

const ProductDetail = ({ product }) => {
  const router = useRouter();

  // > untuk mengatasi bila fallback getStaticPath = true
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Product Detail: { product.nameProduct }</h1>
      <p>Product Name: { product.nameProduct }</p>
      <p>Product Price: { product.priceProduct }</p>
      <p>Product Category: { product.categoryProduct }</p>
    </>
  );
}

export default ProductDetail;

// > Untuk menghandle dynamic parameter bila menggunakan SSG.
// > Oleh sebab itu kita harus menggunakan getStaticPaths().
// > path akan di generate secara static.
// > Penting
// # Saat kita kata jalankan perintah npm build dan kemudian menjalankan npm start (production mode)
// # Maka akan dibuat sebuah folder didalam folder '.next' yang bernama 'server/pages/products'.
// # Didalam folder 'products' ini akan dibuat 5 file static html dan 5 file static json yang berisikan data-data dari API yang kita panggil ini.
// # Karena disini kita memiliki 5 data product didalam API kita.
// # Pada saat kita akses route 'http://localhost:3000/products/1', maka si next js akan membaca file yang berada didalam .next/server/product/1.html untuk halaman html-nya, dan 1.json untuk datanya. Begitu juga dengan jika kita akses parameter 2-5.
// # Tetapi pada saat kita akses 'http://localhost:3000/products/6, maka akan muncul halaman not found, karena data didalam API dan telah dibuild data kita hanya ada 5 dan fallback yang kita buat adalah false.
// > Bila di Production
// => Bila 'fallback' di return 'getStaticPaths' yang kita buat = false, dan data yang kita miliki cuma 5 dan coba kita akses data 6. Maka dia akan mengembalikan halaman not found.
// => Bila 'fallback' di return 'getStaticPaths' yang kita buat = 'blocking', maka next js akan membuatkan data statisnya untuk data yang belum terdaftar ini. Dengan syarat jika kita limit datanya didalam 'getStaticPaths'. Untuk mengatasinya kita pada function 'getStaticProps()' kita buat pengkondisian untuk mengecek 'data.id' ada atau tidak, jika tidak ada kita return 'notFound: true'.
// => Bila 'fallback' di return 'getStaticPaths' yang kita buat = true, jika data yang dimiliki tidak tersedia, maka next js akan mengembalikan halaman versi fallback pada initial request. Untuk mengatasinya kita bisa menggunakan useRouter.
export const getStaticPaths = async () => {
  // > consume api
  const res = await axios.get('http://localhost:3004/products?_limit=3');
  const data = res.data;

  // > loop pathnya
  const paths = data.map((item) => ({
    params: {
      productId: `${item.id}`
    }
  }));

  // return path
  return {
    paths: paths, // => data hasil loopingnya
    fallback: "blocking"
    // => fallback ada 3 nilai: false, true, blocking
  }
};

// > Untuk mendapatkan parameter didalam getStaticProps() kita tidak bisa menggunakan "useRouter" dari component kita.
// > Untuk itu kita bisa mengirimkan argument '{ params }' didalamnya.
// > Untuk mengirim parameternya kita dapat kirimkan
// => params.parameter (dalam hal ini harus mengikuti nama file yakni 'productId').
// => params.productId
export const getStaticProps = async ({ params }) => {
  // console.info(params, 'paramsnya');
  // > consume api
  const res = await axios.get(`http://localhost:3004/products/${params.productId}`);
  const data = res.data;

  // > bila data tidak ditemukan (return halaman not found)
  if (!data.id) {
    return {
      notFound: true
    }
  }

  // > bila data ditemukan
  return {
    props: {
      product: data
    }
  }
};