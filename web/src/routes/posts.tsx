import useSWR from "swr";

const fetcher = (input: RequestInfo | URL) =>
  fetch(input).then((res) => res.json());
const POSTS_TO_SHOW = 5;

export function PostsPage() {
  const { data, error, isLoading } = useSWR<
    { userId: number; id: number; title: string; body: string }[]
  >(`https://jsonplaceholder.typicode.com/posts/`, fetcher);

  if (error || !data) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <p>loaded {data.length} posts</p>
      <p>first {POSTS_TO_SHOW} posts are as follows:</p>
      {data.map((post, i) => {
        if (i > POSTS_TO_SHOW) return;
        return (
          <div className="collapse bg-base-100 border border-base-300">
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked={i === 0}
            />
            <p className="collapse-title font-semibold">{post.title}</p>
            <p className="collapse-content text-sm">{post.body}</p>
          </div>
        );
      })}
    </>
  );
}

export default PostsPage;
