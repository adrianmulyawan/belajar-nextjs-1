import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AnimalDetail = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const router = useRouter();
  const { animalId } = router.query;
  console.info(animalId, 'id binatang');

  let i = 0;
  useEffect(() => {
    if (i === 0) {
      const getAnimal = async () => {
        const response = await axios.get(`http://localhost:3004/animals/${animalId}`);
        const data = response.data;

        setName(data.name);
        setType(data.type);
      };

      getAnimal();

      i++;
    }
  }, [animalId]);

  return (
    <>
      <h1>Detail Hewan</h1>
      <p>Nama Hewan: { name }</p>
      <p>Tipe Hewan: { type }</p>
    </>
  );
}

export default AnimalDetail;
