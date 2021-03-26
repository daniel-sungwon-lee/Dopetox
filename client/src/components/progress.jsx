import React from 'react';
import { LinearProgress } from '@material-ui/core';

export default function Progress(props) {
  const { progress } = props

  return (
    <div className="fixed-top">
      <LinearProgress className={progress} color="secondary" />
    </div>
  )
}
