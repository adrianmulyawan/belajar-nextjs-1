import useSWR from 'swr';
import Link from "next/link";

// > Client Side Data Fetching
// => Client Side Data Fetching sangat berguna sekali jika terdapat perubahan data, disaat setelah terjadinya initial request.
// => Tidak SEO Friendly.
// => Tapi sangat bermanfaat bila digunakan dihalaman seperti dashboard (yang bersifat privat)
// => Menggunakan Client Side Data Fetching
// # useEffect
// # SWR

// > Client Side Data Fetching: SWR (Direkomendasikan oleh Next JS)
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Animal = () => {
  const { data, error } = useSWR('http://localhost:3004/guns', fetcher);
  // console.info(data, 'ini datanya');

  if (error) {
    return (
      <h1>Failed to Load</h1>
    )
  }

  if (!data) {
    return (
      <h1>Data Loading...</h1>
    )
  }

  return (
    <>
      <h1>Daftar Senjata</h1>
      {
        data.map((gun) => {
          return (
            <ul key={ gun.id }>
              <Link href={`/gun/${gun.id}`}>
                <li>{ gun.name } - { gun.type}</li>
              </Link>
            </ul>
          )
        })
      }
    </>
  );
}

export default Animal;
