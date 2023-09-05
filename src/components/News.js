import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default function News(props) {
  const [articles, setArticles] = useEffect([]);
  const [loading, setLoading] = useEffect(false);
  const [page, setPage] = useEffect(1);
  const [totalResults, setTotalResults] = useEffect(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults)
  }
  
  useEffect(() => {
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  }

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  }
  return (
    <div className="container">
    <h1>Top Headlines</h1>
    {loading && <Spinner />}
    <div className="row">
      {!loading && articles.map((element) => {
        return (
          <div className="col-md-4 my-3" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0,30) : ""} description={ element.description ? element.description.slice(0,60) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} />
          </div>
        );
      })}
    </div>
    <div className="container d-flex justify-content-between mb-3">
      <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
      <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
    </div>
  </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: PropTypes.string,
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}