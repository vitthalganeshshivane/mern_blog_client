import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const BlogStats = ({ stats }) => {};

const ManagePublishedBlogsCard = ({ blog }) => {
  let { banner, blog_id, title, publishedAt, activity } = blog;

  let [showStat, setShowStat] = useState(false);

  return (
    <>
      <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
        <img
          src={banner}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover"
          alt=""
        />

        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div>
            <Link
              className="blog-title mb-4 hover:underline"
              to={`/blog/${blog_id}`}
            >
              {title}
            </Link>
            <p className="line-clamp-1">Published on {getDay(publishedAt)}</p>
          </div>
          <div className="flex gap-6 mt-3">
            <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">
              Edit
            </Link>
            <button
              className="lg:hidden pr-4 py-2 underline"
              onClick={() => setShowStat((preVal) => !preVal)}
            ></button>
            <button className="pr-4 py-2 underline text-red">Delete</button>
          </div>
        </div>

        <div className="max-lg:hidden">
          <BlogStats stats={activity} />
        </div>
      </div>
      {showStat ? (
        <div className="lg:hidden">
          {" "}
          <BlogStats stats={activity} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ManagePublishedBlogsCard;
