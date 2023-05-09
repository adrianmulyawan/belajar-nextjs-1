// > Contoh nested route
// => Untuk mengaksesnya localhost:3000/blog 
// => yang dibaca index.js dianggap (/), sama seperti index.js didalam folder pages

// > import package useRouter dari next/router
import { useRouter } from "next/router";

const Blog = () => {
  // > inisialisasi method useRouter dan assign ke variable router
  const router = useRouter();
  // > Menangkap query parameter yang dikirim oleh user
  const { page, limit } = router.query;

  return (
    <>
      <h1>Ini adalah halaman blog</h1>
      <p>Query Parameter: { page } Page dan { limit } Limit </p>
    </>
  );
}

export default Blog;
