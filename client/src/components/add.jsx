import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField,
         Collapse, DialogActions, IconButton } from '@material-ui/core';
import { NoteAddRounded, CloseRounded } from '@material-ui/icons';
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
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Collapse ref={ref} {...props} />
})

export default function Add(props) {
  const classes = useStyles()
  const { open, setOpen, setProgress } = props

  const [username, setUsername] = useState('')
  const [detox, setDetox] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

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
      case 'notes':
        setNotes(value)
        break;
    }
  }

  const handleClose = (e) => {
    setUsername('')
    setDetox('')
    setDuration('')
    setNotes('')
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProgress('')

    const reqBody = { username, detox, duration, notes }
    fetch('/api/detox', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setOpen(false)
        setProgress('d-none')
      })
      .catch(() => window.location.reload())
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{paper: classes.dialog}}
     TransitionComponent={Transition}>
      <div className="m-3">

        <DialogTitle>
          <h2>Add New Detox</h2>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>

            <div className="mb-3">
              <TextField multiline id="username" variant="outlined" label="Username" classes={{ root: classes.textarea }} value={username}
                helperText="Ex: Anonymous" required InputLabelProps={{ required: false }} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="detox" variant="outlined" label="Detox" classes={{root: classes.textarea}} value={detox}
               helperText="Ex: Porn" required InputLabelProps={{required: false}} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="duration" variant="outlined" label="Duration" classes={{ root: classes.textarea }} value={duration}
               helperText="Ex: At least 1 month" required InputLabelProps={{ required: false }} fullWidth onChange={handleChange} />
            </div>

            <div className="mb-3">
              <TextField multiline id="notes" variant="outlined" label="Notes" classes={{ root: classes.textarea }}
                helperText="Any additional notes" required InputLabelProps={{ required: false }} fullWidth
                rows={5} onChange={handleChange} value={notes} />
            </div>

          </DialogContent>

          <DialogActions>
            <IconButton onClick={handleClose}>
              <CloseRounded color="secondary" className={classes.icon} />
            </IconButton>

            <IconButton type="submit">
              <NoteAddRounded className={classes.iconAdd} />
            </IconButton>
          </DialogActions>
        </form>

      </div>
    </Dialog>
  )
}
