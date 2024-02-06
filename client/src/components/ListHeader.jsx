import { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'

function ListHeader({ listName, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showmodal, setShowModal] = useState(false)

  function signOut() {
    console.log('Sign out!')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div>
        <button onClick={() => setShowModal(true)}>Add new</button>
        <button onClick={signOut}>Sign out</button>
      </div>
      {showmodal && (
        <Modal mode={'create'} showModal={setShowModal} getData={getData} />
      )}
    </div>
  )
}

export default ListHeader
