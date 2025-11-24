import { useContext, useState } from "react";
import { getDay } from "../common/date";
import { userContext } from "../App";
import toast from "react-hot-toast";
import CommentField from "./comment-field.component";

const CommentCard = ({ index, leftVal, commentData }) => {
  let {
    commented_by: {
      personal_info: { profile_img, fullname, username },
    },
    commentedAt,
    comment,
  } = commentData;

  let {
    userAuth: { access_token },
  } = useContext(userContext);

  const [isReplying, setReplying] = useState(false);

  const handleReplyClick = () => {
    if (!access_token) {
      return toast.error("login first to leave a reply a reply");
    }

    setReplying((preVal) => !preVal);
  };

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-9">
        <div className="flex gap-3 items-center mb-8">
          <img src={profile_img} className="w-6 h-6 rounded-full" alt="" />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(commentedAt)}</p>
        </div>
        <p className="font-gelasio text-xl ml-3">{comment}</p>

        <div className="flex gap-5 items-center mt-5">
          <button onClick={handleReplyClick} className="underline">
            Reply
          </button>
        </div>
        {isReplying ? (
          <div className="mt-8">
            <CommentField action="reply" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
