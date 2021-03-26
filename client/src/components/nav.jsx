import React, { useEffect, useState } from 'react';
import { AppBar, Collapse, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#FBDADE"
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
            <a href="/" className="text-decoration-none" onClick={() => props.setProgress('')}>
              <div className="d-flex align-items-center">
                <img src="images/dopetox.svg" alt="Dopetox logo" width="40" />
                <h3 className="mx-2 my-0 text-dark">Dopetox</h3>
              </div>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    </Collapse>
  )
}
