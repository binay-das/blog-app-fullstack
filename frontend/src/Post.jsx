import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
// import Image from `${cover}`;
export default function Post({ _id, title, summary, cover, content, createdAt, author }) {


  return (
    <div className="post">
      <div className="image">
        <img src={cover} alt="cover_img" />
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        {/* <h2>Cover: {cover}</h2> */}
        <p className="info">
          <a href="" className='author'>Binay</a>
          {/* <a className="author">{author.username}</a> */}
          {/* <time datetime="">{formatISO9075(new Date(createdAt))}</time> */}
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
}