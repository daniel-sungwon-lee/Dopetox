import React, { useEffect, useState } from 'react';
import { CardContent, CardHeader, Paper } from '@material-ui/core';

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
            const { id, username, detox, duration, plan, createdAt } = post
            const dateArr = createdAt.split("T")
            const [date] = dateArr

            return (
              <Paper key={id} className="p-4 mb-5">

                <CardHeader title={detox} subheader={username} />
                <CardContent>
                  <h5>Duration of detox:</h5>
                  <h6>{duration}</h6>
                  <h5>Game plan:</h5>
                  <h6>{plan}</h6>
                  <h5>Start date:</h5>
                  <h6>{date}</h6>
                </CardContent>

              </Paper>
            )
          })
        }
      </div>
    </div>
  )
}
