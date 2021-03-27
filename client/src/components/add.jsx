import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField,
         Collapse } from '@material-ui/core';
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
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Collapse ref={ref} {...props} />
})

export default function Add(props) {
  const classes = useStyles()
  const { open, setOpen } = props
  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{paper: classes.dialog}}
     TransitionComponent={Transition}>
      <div className="m-3">

        <DialogTitle>
          <h2>What do you want to detox?</h2>
        </DialogTitle>

        <form>
          <DialogContent>
            <TextField multiline id="content" variant="outlined" label="Detox" classes={{root: classes.textarea}}
             helperText="Ex: Porn" required InputLabelProps={{required: false}} />
          </DialogContent>
        </form>

      </div>
    </Dialog>
  )
}
