import { useRouter } from "next/router";

const Slug = () => {
  // > Menangkap slug yang dikirim oleh user
  const router = useRouter();
  // > data yang dikirimkan berupa array
  const { slug = [] } = router.query;
  // console.info(slug, '=> ini adalah slug');

  // > ambil data dari slug
  const dataSlug = slug.map((data) => `${data} `);

  return (
    <>
      <h1>Ini adalah halaman post {dataSlug}</h1>
    </>
  );
}

export default Slug;
