import React from 'react';
import { Dialog, DialogContent, DialogActions, Zoom,
         IconButton, DialogTitle } from '@material-ui/core';
import { CancelRounded, SentimentSatisfiedRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    borderRadius: "1rem",
    width: "75%"
  },
  content: {
    fontSize: "18px"
  },
  icon: {
    color: "#FB7B76"
  }
})

export default function Info(props) {
  const { open, setOpen } = props
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Zoom} classes={{ paper: classes.dialog }}>
      <div className="m-3">

        <DialogTitle>
          <h2>Wall of Text</h2>
        </DialogTitle>

        <DialogContent>
          <p className={classes.content}>
            Dopamine detox, or dopamine fast, is a process where you detox all
            the things in your life that may overstimulate your brain and cause
            it to think that it needs more dopamine than it actually does;
            this overstimulation of your brain causes you to get easily distracted,
            since your brain is in constant need for instant pleasures and motivates
            you to take on those pleasures, thus making it hard to do the things
            in your life that are actually important because it seems "too boring."
          </p>
          <p className={classes.content}>
            <span className={classes.icon}>Dopetox</span> helps you detox your
            dopamine levels so that you can not only focus more on the things that
            may improve your life (even though it may take time and effort), but
            also for you to reset your dopamine levels to find pleasure in the
            "boring" or simple things in life. <SentimentSatisfiedRounded
              className={classes.icon} />
          </p>
        </DialogContent>

        <DialogActions>

          <IconButton onClick={() => setOpen(false)}>
            <CancelRounded color="secondary" fontSize="large" />
          </IconButton>

        </DialogActions>

      </div>
    </Dialog>
  )
}
