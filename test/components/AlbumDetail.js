import React from 'react'

// stateless component
const AlbumDetail = ({
  id,
  title,
  band,
  firstTrack,
  numTracks,
  openPlayer: onMouseOver,
  onClick,
  ...props
}) => {
  return <div
    id={id}
    onClick={onClick}
    onMouseOver={onMouseOver}
    {...props}
  >
    <h2>{title}</h2>
    <h3>{band}</h3>
    <ul>
      <li><label>First Track Title:</label> {firstTrack.title}</li>
      <li><label>Num of Tracks:</label> {numTracks}</li>
    </ul>
  </div>
}

export default AlbumDetail
