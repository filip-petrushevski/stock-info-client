import React, { useEffect, useState } from 'react';
import ArticleCard from '../article-card/article-card';
import ApiService from '../../services/api-service/api-service';
import BodyContainer from '../body-container/body-container';

const getArticleCard = (articleObject) => <ArticleCard
    key={"article" + articleObject.id}
    urlToImage={articleObject.urlToImage}
    publishedAt={articleObject.publishedAt}
    title={articleObject.title}
    description={articleObject.description}
    author={articleObject.author}
    url={articleObject.url}></ArticleCard>;



export default function News() {
    var [articles, setArticles] = useState();

    useEffect(() => {
        ApiService.getAllArticles()
            .then(res => {
                const articlesFetched = res.data.map(obj => getArticleCard(obj));
                setArticles(articlesFetched);
            })
    }, [])

    return (<BodyContainer>
        {articles}
    </BodyContainer>)
}