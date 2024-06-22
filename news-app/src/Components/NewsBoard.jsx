// import React from 'react'

// import { useEffect, useState } from "react"
// import NewsItem from "./NewsItem";

// const NewsBoard = () => {

//     const[articles, setArticles] = useState([]);

//     useEffect(() => {
//         let url ='https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}';
//         fetch(url).then(response => response.json()).then(data => setArticles(data.articles));
//     },[])
//   return (
//     <div>
//       <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
//       {articles.map((news, index) => {
//         return <NewsItem 
//         key={index} 
//         title={news.title} 
//         description={news.description} 
//         src={news.urlToImage} 
//         url={news.url}/>
//       })}
//     </div>
//   )
// }

// export default NewsBoard

import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setArticles(data.articles))
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error);
      });
  }, [category]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p>No news articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
