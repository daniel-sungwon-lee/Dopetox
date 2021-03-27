import React, { useEffect, useState } from 'react';
import { AppBar, Collapse, Toolbar, Tooltip, IconButton } from '@material-ui/core';
import { NoteAddRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Add from './add';

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
  }
})

export default function Nav(props) {
  const { setProgress } = props
  const classes = useStyles();

  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Collapse in={show} timeout="auto">
      <div className="sticky-top mb-5">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar className="justify-content-between">

            <a href="/" className="text-decoration-none" onClick={() => setProgress('')}>
              <div className="d-flex align-items-center">
                <img src="images/dopetox.svg" alt="Dopetox logo" width="40" />
                <h3 className="mx-2 my-0 text-dark">Dopetox</h3>
              </div>
            </a>

            <Tooltip title="Add" classes={{ tooltip: classes.tooltip }}>
              <IconButton onClick={() => setAdd(true)}>
                <NoteAddRounded className={classes.icon} />
              </IconButton>
            </Tooltip>

            <Add open={add} setOpen={setAdd} setProgress={setProgress} />

          </Toolbar>
        </AppBar>
      </div>
    </Collapse>
  )
}
