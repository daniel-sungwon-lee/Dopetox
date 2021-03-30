import React, { useEffect, useState } from 'react';
import { CardContent, CardHeader, Collapse, Paper } from '@material-ui/core';
import TimeAgo from 'react-timeago';

export default function Home(props) {
  const { setProgress } = props
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    setProgress('')

    fetch('/api/detox')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setProgress('d-none')
        setShow(true)
      })
      .catch(() => window.location.reload())
  }, [setProgress])

  return (
    <div className="container" style={{paddingBottom: "6rem"}}>
      <h1 className="mb-5">Detox</h1>
      <div>
        {
          data.map(post => {
            const { id, username, detox, duration, plan, createdAt } = post
            const dateNew = new Date(createdAt)
            const date = dateNew.toLocaleDateString()

            return (
              <Collapse in={show} timeout="auto">
                <Paper key={id} className="p-4 mb-5 mx-3">

                  <div>
                    <CardHeader title={<h3 style={{ color: "#f50057" }}>{detox}</h3>}
                    subheader={<h6>{`Posted by: ${username}`}</h6>} />
                    <CardContent>
                      <div className="mb-4">
                        <h5>Duration of detox:</h5>
                        <h6>{duration}</h6>
                      </div>

                      <div className="mb-4">
                        <h5>Game plan:</h5>
                        <h6>{plan}</h6>
                      </div>

                      <div>
                        <h5>Start date:</h5>
                        <h6 className="m-0">{date}</h6>
                        <TimeAgo date={createdAt} style={{ color: "#FB7B76" }} />
                      </div>
                    </CardContent>
                  </div>

                </Paper>
              </Collapse>
            )
          })
        }
      </div>
    </div>
  )
}
