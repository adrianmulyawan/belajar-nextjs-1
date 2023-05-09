// > Membuat redirect saat data berhasil disimpan (contoh)
import { useRouter } from "next/router";

const Add = () => {
  const router = useRouter();

  const publishBlog = () => {
    console.log('Data berhasil disimpan');

    // > direct kehalaman utama blog dengan methos "push()"
    router.push('/blog');
  }

  return (
    <>
      <h2>Tambah Blog</h2>
      <button onClick={ publishBlog }>Publish</button>
    </>
  );
}

export default Add;
