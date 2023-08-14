//// Example for Client-side data fetching:

import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch(`http://localhost:4000/dashboard`)
      const data = await response.json();
      setDashboardData(data);
      setIsLoading(false);
    }

    fetchDashboardData();
  }, []);

  //Next.js only prerenders the following Loading page, because this is the initial state of the component. Next.js doesnt wait for the API call and update the isLoading state of the component
  //So the page source will always contain the this Loading.. text and the data below (Dashboard) is never pre-rendered!
  if (isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }


  return (
    <>
      <h2>Dashboard</h2>
      <h2>Posts - {dashboardData.posts}</h2>
      <h2>Likes - {dashboardData.likes}</h2>
      <h2>Followers - {dashboardData.followers}</h2>
      <h2>Following - {dashboardData.following}</h2>
    </>
  )
}

export default Dashboard;