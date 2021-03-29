import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';

export default function Home(props) {
  const { setProgress } = props
  const [data, setData] = useState([])

  useEffect(() => {
    setProgress('')

    fetch('/api/detox')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setProgress('d-none')
      })
      .catch(() => window.location.reload())
  }, [setProgress])

  return (
    <div className="container">
      <h1 className="mb-5">Detox</h1>
      <div>
        {
          data.map(post => {
            const { id, username, detox, duration, notes } = post

            return (
              <Paper key={id} className="p-5">
                <h3>{username}</h3>
                <h3>{detox}</h3>
                <h4>{duration}</h4>
                <h4>{notes}</h4>
              </Paper>
            )
          })
        }
      </div>
    </div>
  )
}
