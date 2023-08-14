const ArticleListByCategory = ({ articles, category }) => {
  return (
    <>
      <h1>Showing news for category <i>{category}</i></h1>
      {
        articles.map(article => {
          return (
            <div key={article.title}>
              <h2>Article ID: {article.id} | Title: {article.title} | Category: {article.category}</h2>
              <p>Article Description: {article.description}</p>
              <hr />
            </div>
          )
        })
      }
    </>
  )
}

export default ArticleListByCategory;


export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;
  const response = await fetch(`http://localhost:4000/news?category=${category}`);
  const data = await response.json();
  return {
    props: {
      articles: data,
      category
    }
  }
}