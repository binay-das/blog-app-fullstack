import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
// import Image from `${cover}`;
export default function Post({ _id, title, summary, cover, content, createdAt, author }) {


  return (
    <div className="post">
      <div className="image">
        {/* <img src="https://cdn.pixabay.com/photo/2018/05/11/08/34/sky-3389832_1280.jpg" alt="" /> */}
        {/* <img src={cover} alt="img_path" /> */}
        {/* <img src="C:\Users\binay\Desktop\Hustle\full-stack\api\uploads\23dc7327e3aae041a2085de26d9b4414.jpg" alt="img_path" /> */}
        {/* <img src="/assets/pic.png" alt="Cover Image" /> */}

        
          {/* <img src={'http://localhost:8080/' + cover} alt="" /> */}
          
            <img src={cover} alt="" />
          
        
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <h2>Cover: {cover}</h2>
        <h5>img-src: http://localhost:8080/{cover}</h5>
        <h5>img-src(cover): {cover}</h5>
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