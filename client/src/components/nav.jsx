import React, { useEffect, useState } from 'react';
import { AppBar, Collapse, Toolbar, Tooltip, IconButton } from '@material-ui/core';
import { NoteAddRounded, InfoRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Add from './add';
import Info from './info';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#FBDADE"
  },
  tooltip: {
    backgroundColor: "#FB7B76"
  },
  icon: {
    fontSize: "3rem",
    color: "#FB7B76"
  },
  info: {
    fontSize: "2.8rem",
    color: "#FB7B76",
    opacity: "0.5"
  }
})

export default function Nav(props) {
  const { setProgress } = props
  const classes = useStyles();

  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [info, setInfo] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Collapse in={show} timeout="auto" className="sticky-top">
      <div className="mb-5">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar className="justify-content-between">

            <a href="/" className="text-decoration-none" onClick={() => setProgress('')}>
              <div className="d-flex align-items-center">
                <img src="images/dopetox.svg" alt="Dopetox logo" width="40" />
                <h3 className="mx-2 my-0 text-dark">Dopetox</h3>
              </div>
            </a>

            <div>
              <Tooltip title="Info" classes={{ tooltip: classes.tooltip }}>
                <IconButton onClick={() => setInfo(true)}>
                  <InfoRounded className={classes.info} />
                </IconButton>
              </Tooltip>

              <Info open={info} setOpen={setInfo} />

              <Tooltip title="Add" classes={{ tooltip: classes.tooltip }}>
                <IconButton onClick={() => setAdd(true)}>
                  <NoteAddRounded className={classes.icon} />
                </IconButton>
              </Tooltip>

              <Add open={add} setOpen={setAdd} setProgress={setProgress}
              onClick={window.history.pushState({}, document.title, '/')} />
            </div>

          </Toolbar>
        </AppBar>
      </div>
    </Collapse>
  )
}
