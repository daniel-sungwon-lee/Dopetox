import React, { useEffect, useState } from 'react';
import { AppBar, Collapse, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#FFC6AD"
  }
})

export default function Nav(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Collapse in={show} timeout="auto">
      <div className="sticky-top mb-5">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar>

          </Toolbar>
        </AppBar>
      </div>
    </Collapse>
  )
}
