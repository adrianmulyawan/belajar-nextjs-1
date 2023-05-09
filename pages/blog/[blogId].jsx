import { useRouter } from "next/router";

const BlogId = () => {
  // > Mengambil value dari parameter link
  const router = useRouter();
  // > blogId didapatkan dari nama filenya
  const { blogId } = router.query;

  return (
    <>
      <h2>Ini adalah blog dynamic route { blogId }</h2>
    </>
  );
}

export default BlogId;
