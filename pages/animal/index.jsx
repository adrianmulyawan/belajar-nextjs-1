import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// > Client Side Data Fetching
// => Client Side Data Fetching sangat berguna sekali jika terdapat perubahan data, disaat setelah terjadinya initial request.
// => Tidak SEO Friendly.
// => Tapi sangat bermanfaat bila digunakan dihalaman seperti dashboard (yang bersifat privat)
// => Menggunakan Client Side Data Fetching
// # useEffect
// # SWR

// > Client Side Data Fetching: useEffect
const Animal = () => {
  const [animals, setAnimals] = useState([]);

  let i = 0;
  useEffect(() => {
    if (i === 0) {
      const getAnimal = async () => {
        const response = await axios.get('http://localhost:3004/animals');
        const data = response.data;
  
        setAnimals(data);
      };
  
      getAnimal();

      i++;
    }
  }, [i]);

  return (
    <>
      <h1>Daftar Hewan</h1>
      {
        animals.map((animal) => {
          return (
            <ul key={ animal.id }>
              <Link href={`/animal/${animal.id}`}>
                <li>
                  { animal.name } - { animal.type }
                </li>
              </Link>
            </ul>
          )
        })
      }
    </>
  );
}

export default Animal;
