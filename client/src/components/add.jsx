import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Zoom,
         DialogActions, IconButton, Tooltip } from '@material-ui/core';
import { AddCircleRounded, RemoveCircleRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    width: "75%",
    borderRadius: "1rem"
  },
  textarea: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: "#FBDADE"
      }
    }
  },
  iconAdd: {
    color: "#52BD4C",
    fontSize: "2.5rem"
  },
  icon: {
    fontSize: "2.5rem"
  },
  tooltip: {
    backgroundColor: "#FB7B76",
    fontSize: "16px",
    borderRadius: "1rem",
    padding: "16px"
  }
})

export default function Add(props) {
  const classes = useStyles()
  const { open, setOpen, setProgress } = props

  const [username, setUsername] = useState('')
  const [detox, setDetox] = useState('')
  const [duration, setDuration] = useState('')
  const [plan, setPlan] = useState('')

  const handleChange = (e) => {
    const { value, id } = e.target

    // eslint-disable-next-line default-case
    switch(id) {
      case 'username':
        setUsername(value)
        break;
      case 'detox':
        setDetox(value)
        break;
      case 'duration':
        setDuration(value)
        break;
      case 'plan':
        setPlan(value)
        break;
    }
  }

  const handleClose = (e) => {
    setUsername('')
    setDetox('')
    setDuration('')
    setPlan('')
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProgress('')

    const reqBody = { username, detox, duration, plan, support: 0 }
    fetch('/api/detox', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setUsername('')
        setDetox('')
        setDuration('')
        setPlan('')
        setOpen(false)
        setProgress('d-none')
      })
      .catch(() => window.location.reload())
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{paper: classes.dialog}}
     scroll="body" TransitionComponent={Zoom}>
      <div className="m-3">

        <DialogTitle>
          <h2>Add New Detox</h2>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>

            <div className="mb-3">
              <TextField multiline id="username" variant="outlined" label="Username" classes={{ root: classes.textarea }} value={username}
                helperText="Ex: anonymous" required InputLabelProps={{ required: false }} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="detox" variant="outlined" label="Detox" classes={{root: classes.textarea}} value={detox}
               helperText="Ex: YouTube" required InputLabelProps={{required: false}} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="duration" variant="outlined" label="Duration" classes={{ root: classes.textarea }} value={duration}
               helperText="Ex: At least 1 month" required InputLabelProps={{ required: false }} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="plan" variant="outlined" label="Plan" classes={{ root: classes.textarea }}
                helperText="Ex: Limit to only 2 hours per day" required InputLabelProps={{ required: false }} fullWidth
                rows={5} onChange={handleChange} value={plan} />
            </div>

          </DialogContent>

          <DialogActions>

            <IconButton onClick={handleClose}>
              <RemoveCircleRounded color="secondary" className={classes.icon} />
            </IconButton>

            <Tooltip title="Please double check your form; once added, you are committed and can't make
             any changes!" classes={{tooltip: classes.tooltip}}>
              <IconButton type="submit">
                <AddCircleRounded className={classes.iconAdd} />
              </IconButton>
            </Tooltip>

          </DialogActions>
        </form>

      </div>
    </Dialog>
  )
}
