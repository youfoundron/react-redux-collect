import React from 'react'

const TrackDetail = ({title, length, ...props}) => (
  <div {...props}>
    <h3>{title}</h3>
    <p><label>Lenth:</label>{length}</p>
  </div>
)

export default TrackDetail
