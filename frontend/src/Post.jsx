import {formatISO9075} from "date-fns";

export default function Post({title, summary, cover, content, createdAt}) {
    return(
        <div className="post">
          <div className="image">
          <img src="https://cdn.pixabay.com/photo/2018/05/11/08/34/sky-3389832_1280.jpg" alt="" />
          </div>

          <div className="texts">
            <h2>{title}</h2>
            <p className="info">
              <a href="" className='author'>Binay</a>
              <time datetime="">{formatISO9075(new Date(createdAt))}</time>
            </p>
            <p className='summary'>{summary}</p>
          </div>
        </div>
    );
}