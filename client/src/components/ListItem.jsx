import { useState } from 'react'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'
import Modal from './Modal'

function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false)

  async function deleteItem() {
    try {
      const res = await fetch(
        `https://todoapp-server-xwnw.onrender.com/${task.id}`,
        {
          method: 'DELETE',
        },
      )
      if (res.status === 200) {
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li className="list-item">
      <div className="list-item__main">
        <TickIcon />
        <p>{task.title}</p>
        <ProgressBar />
      </div>

      <div>
        <button
          className="list-item__button"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button className="list-item__button" onClick={deleteItem}>
          Delete
        </button>
      </div>

      {showModal && (
        <Modal
          mode={'edit'}
          showModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  )
}

export default ListItem
