import axios from "axios";
import Link from "next/link";

const Student = ({ students }) => {
  console.info(students);
  return (
    <>
      <h1>Student Page</h1>
      {
        students.map((data) => {
          return (
            <ul key={ data.id }>
              <Link href={`/students/${data.id}`}>
                <li>
                  { data.name } - { data.email } - { data.class }
                </li>
              </Link>
            </ul>
          )
        })
      }
    </>
  );
}

export default Student;

// > SSR (Server Side Rendering)
// => Berbeda dengan SSG (Static Site Generation) yang merender halaman html dan datanya pada saat proses build.
// => SSR (Server Side Rendering) melakukan render halaman htnl dan datanya pada saat ada request yang masuk.
// => Untuk menggunakan SSR pada sebuah halaman kita dapat menambahkan fungsi yang bernama 'getServerSideProps()'.
// => Fungsi ini dipanggil oleh server pada saat request.
export const getServerSideProps = async () => {
  // > Consume API
  const res = await axios.get('http://localhost:3004/students');
  const data = res.data;
  // console.info(data);

  // > Bila data tidak ditemukan
  if (!data) {
    return {
      notFound: true
    }
  }

  // > Bila data ditemukan
  return {
    props: {
      students: data,
    }
  };
}