import axios from "axios";

const StudentDetail = ({ student }) => {
  return (
    <>
      <h1>Info Student: { student.name }</h1>
      <p>Email: { student.email }</p>
      <p>Class{ student.class }</p>
    </>
  );
}

export default StudentDetail;

export const getServerSideProps = async ({ params }) => {
  // > consume api 
  const res = await axios.get(`http://localhost:3004/students/${params.studentId}`);
  const data = res.data;

  // > Bila id tidak ditemukan
  if (!data.id) {
    return {
      notFound: true
    };
  }

  // > Bila ditemukan
  return {
    props: {
      student: data
    }
  };
};