import User from '../components/user';

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

      {/*// same as above, but using imported custom component*/}
      <h1>List of users</h1>
      {users.map((user) =>
        <div key={user.id}>
          <User user={user} />
        </div>
      )}
    </>
  )
}

export default UserList;

//// getSaticProps is only allowed in pages, cannot be run from regular components file!
//used ONLY for pre-rendering and NOT client side data fetching
//you can write server-side code directly in getStaticProps
//Access to filesystem with 'fs' or querying database can be done inside getStaticProps
//Don't have to worry about including API-keys in it, as that won't make it to the browser 
//getSaticProps will run in build time
//during dev, getSaticProps runs on every request
export async function getStaticProps() {
  const response = await fetch('http://jsonplaceholder.typicode.com/users')
  const data = await response.json();
  console.log(data);

  return { //it should return an object!, which is given to the UserList component in build time..
    props: { //return should have a props key, which is also an object
      users: data,
    }
  }
}