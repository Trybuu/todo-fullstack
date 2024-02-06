import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import './App.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const res = await fetch(
        `https://todo-fullstack-app-3srp.onrender.com/${userEmail}`,
      )
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  console.log(tasks)

  // sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'🏝️ Holiday tick list'} getData={getData} />
          <p>Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
