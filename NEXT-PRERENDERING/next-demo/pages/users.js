const UserList = ({ users }) => {
  return (
    <>
      <h1>List of users</h1>
      {users.map((user) =>
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>

      )}
    </>
  )
}

export default UserList;

export async function getStaticProps() {
  const response = await fetch('http://jsonplaceholder.typicode.com/users')
  const data = await response.json();
  console.log(data);

  return { //return an object!, which is given to the UserList component in build time..
    props: { //props
      users: data,
    }
  }
}