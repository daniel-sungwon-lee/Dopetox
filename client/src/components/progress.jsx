import React from 'react';
import { LinearProgress } from '@material-ui/core';

export default function Progress(props) {
  const { loading } = props

  return (
    <div className="fixed-top">
      <LinearProgress className={loading} color="secondary" />
    </div>
  )
}
