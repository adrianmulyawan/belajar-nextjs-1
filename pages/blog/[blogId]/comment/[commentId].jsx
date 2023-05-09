import { useRouter } from 'next/router'

const CommentId = () => {
  const params = useRouter();
  const { blogId, commentId } = params.query;

  return (
    <>
      <h2>Ini adalah adalah halaman blog comment</h2>
      <p>Dari { blogId } - { commentId }</p>
    </>
  );
}

export default CommentId;
