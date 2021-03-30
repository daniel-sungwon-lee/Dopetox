import React, { useEffect, useState } from 'react';
import { CardContent, CardHeader, Collapse, Paper, Zoom, Fab,
         useScrollTrigger } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import { KeyboardArrowUpRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  paper: {
    padding: "1.5rem",
    margin: "0 1rem 3rem",
    borderRadius: "1rem"
  },
  fab: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem"
  }
})

export default function Home(props) {
  const { setProgress } = props
  const classes = useStyles()

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
              <Collapse in={show} timeout={800}>
                <Paper key={id} className={classes.paper} elevation={3}>

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

      <ScrollTop {...props}>
        <a href="#top">
          <Fab color="secondary" size="small">
            <KeyboardArrowUpRounded />
          </Fab>
        </a>
      </ScrollTop>

    </div>
  )
}

//scroll to top fab
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <div role="presentation" className={classes.fab}>
        {children}
      </div>
    </Zoom>
  );
}
