import useSWR from 'swr';
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const GunDetail = () => {
  const router = useRouter();
  const { gunId } = router.query

  const { data, error } = useSWR(`http://localhost:3004/guns/${gunId}`, fetcher);

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
      <h1>Detail Senjata</h1>
      <p>Nama Senjata: { data.name }</p>
      <p>Tipe Senjata: { data.type }</p>
    </>
  );
}

export default GunDetail;
