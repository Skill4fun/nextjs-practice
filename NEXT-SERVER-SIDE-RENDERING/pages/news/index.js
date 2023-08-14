const NewArticleList = ({ articles }) => {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map(article => {
        return (
          <div key={article.title}>
            <h2>Article ID: {article.id} | Title: {article.title} | Category: {article.category}</h2>
            <p>Article Description: {article.description}</p>
          </div>
        )
      })}
    </>
  )
}

export default NewArticleList;

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:4000/news`)
  const data = await response.json();
  console.log(`Pre-rendering NewsArticleList`);

  return {
    props: {
      articles: data,
    }
  }
}