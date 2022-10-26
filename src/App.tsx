import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header';
import MapContainerOP from './components/MapContainerOP';
import { User, UserDict } from "./helpers/types";

function App() {
  const [activeUsers, setActiveUsers] = useState<UserDict>({})
  const [activePhone, setActivePhone] = useState<string>('')

  useEffect(() => {
    (async () => await fetchUsers())()
  }, [])

  const fetchUsers = async () => {
    // const { users } = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/users`)).json()
    const { users } = {
      users: [{
        username: 'test',
        phone: '1234567890',
      }]
    }
    let newObj: UserDict = {}
    users.forEach((user: User) => {
      newObj[user.phone] = {
        active: false,
        username: user.username,
      }
    })
    setActiveUsers(newObj)
  }

  return (
    <div style={{ display: "flex", flexDirection: 'row' }}>
      <Header />
      <div>
        <h1>
          People
        </h1>
        {Object.keys(activeUsers).map((key: string) => (
          <div key={key} onClick={() => {
            setActiveUsers({
              ...activeUsers,
              [key]: {
                ...activeUsers[key],
                active: !activeUsers[key].active,
              }
            })
            setActivePhone(key)
            window.dispatchEvent(new CustomEvent('subscribe', { detail: key }))
          }}>{activeUsers[key].username} {key === activePhone ? 'yes' : 'no'}</div>
        ))}
      </div>
      <MapContainerOP user={{
        phone: activePhone,
        username: activeUsers[activePhone]?.username,
      }} />
    </div>
  );
}

export default App;
