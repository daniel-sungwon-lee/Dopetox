import React, { useEffect, useState } from 'react';
import { CardContent, CardHeader, Collapse, Paper, Zoom, Fab, List,
         useScrollTrigger, CardActions, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import { KeyboardArrowUpRounded, ExpandMoreRounded, AddCommentRounded } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles( theme => ({
  paper: {
    padding: "1.5rem",
    margin: "0 1rem 3rem",
    borderRadius: "1rem",
    backgroundColor: "#FFEBED"
  },
  fab: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem"
  },
  header: {
    borderRadius: "6rem",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    backgroundColor: "white",
    margin: "1.5rem 0"
  },
  row: {
    borderRadius: "6rem",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    padding: "16px",
    margin: "0 auto 1.5rem",
    backgroundColor: "white"
  },
  bottom: {
    borderRadius: "6rem",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    padding: "16px",
    backgroundColor: "white"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  button: {
    backgroundColor: "white",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.short
    })
  },
  icon: {
    fontSize: "2rem",
    color: "#FB7B76"
  },
  textarea: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: "#FBDADE"
      }
    }
  }
}))

export default function Home(props) {
  const { setProgress } = props
  const classes = useStyles()

  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [expanded, setExpanded] = useState([])

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

  const handleExpand = (id) => () => {
    if(expanded.includes(id)) {
      const updatedExpanded = expanded.filter(iden => iden !== id)
      setExpanded(updatedExpanded)

    } else {
      setExpanded([...expanded, id])
    }
  }

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
                    subheader={<h6>{`Posted by: ${username}`}</h6>} className={classes.header} />

                    <CardContent>

                      <div className={classes.row}>
                        <h5>Duration of detox:</h5>
                        <h6>{duration}</h6>
                      </div>

                      <div className={classes.row}>
                        <h5>Game plan:</h5>
                        <h6>{plan}</h6>
                      </div>

                      <div className={classes.bottom}>
                        <h5>Start date:</h5>
                        <h6 className="m-0">{date}</h6>
                        <TimeAgo date={createdAt} style={{ color: "#FB7B76" }} />
                      </div>

                    </CardContent>
                  </div>

                  <CardActions>
                    <IconButton className={clsx(classes.expand, classes.button, {
                      [classes.expandOpen]: expanded.includes(id),
                    })} onClick={handleExpand(id)}>

                      <ExpandMoreRounded className={classes.icon} />

                    </IconButton>
                  </CardActions>

                  <Collapse in={expanded.includes(id)} timeout="auto">

                    <Comment id={id} setProgress={setProgress} />

                  </Collapse>

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

//comment
function Comment(props) {
  const { id, setProgress } = props
  const classes = useStyles()

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const handleChange = (e) => {
    const { value } = e.target
    setComment(value)
  }

  const handleSubmit = (e) => {
    setProgress('')
    e.preventDefault()

    const reqBody = { id, comment }

    fetch('/api/comments', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setComment('')

        fetch(`/api/comments/${id}`)
          .then(res => res.json())
          .then(comments => {
            setComments(comments)
            setProgress('d-none')
          })
          .catch(() => window.location.reload())
      })
      .catch(() => window.location.reload())
  }

  return (
    <CardContent>
      <List>
        {

        }
      </List>

      <form onSubmit={handleSubmit}>
        <TextField label="Ask how it's going..." variant="outlined" required multiline
          InputLabelProps={{ required: false }} onChange={handleChange} value={comment}
          className={classes.textarea} />

        <IconButton type="submit">
          <AddCommentRounded className={classes.icon} />
        </IconButton>
      </form>
    </CardContent>
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
