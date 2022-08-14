import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";

// SCSS
import "./_News.scss";

// Icons
import ArticleIcon from "@mui/icons-material/Article";

// News API Access
const API_URL =
  "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/";

const News = ({ type, size }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then((res) => res.text())
        .then((data) => {
          const xml = new XMLParser().parseFromString(data);
          const array = xml.children[0].children;
          setNews(array.splice(8));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  console.log(news);

  return (
    <section data-type={type} data-size={size}>
      <div className="container">
        <h3>Senaste nyheterna</h3>
        <ul className="news_list">
          {news.slice(0, 5).map((newsItem, i) => (
            <li key={i}>
              <ArticleIcon />
              <div className="news_info">
                <a
                  href={newsItem.children[1].value}
                  target="_blank"
                  rel="noreferrer"
                >
                  {newsItem.children[0].value.split(">")}
                </a>
                <span className="news-date">
                  {newsItem.children[3].value.split("GMT")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default News;
