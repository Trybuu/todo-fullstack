import { useState } from 'react'
import { useCookies } from 'react-cookie'

function Modal({ mode, showModal, task, getData }) {
  const [cookies] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  })

  async function postData(e) {
    e.preventDefault()

    try {
      const res = await fetch(
        'https://todo-fullstack-app-3srp.onrender.com/todos',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      )
      if (res.status === 200) {
        console.log('✅ New task added')
        showModal(false)
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function editData(e) {
    e.preventDefault()

    try {
      const res = await fetch(
        `https://todo-fullstack-app-3srp.onrender.com/todos/${task.id}`,
        {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(data),
        },
      )

      if (res.status === 200) {
        showModal(false)
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target

    setData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div>
          <h3>Lets {mode} you task</h3>
          <button onClick={() => showModal(false)}>X</button>
        </div>

        <form>
          <input
            type="text"
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            type="range"
            id="range"
            required
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  )
}

export default Modal
