import React, { useEffect, useRef, useState } from 'react'
import { formatTimeAgo } from './FormatTimeAgo';

const VideoCard = ({info}) => {
 
  const {snippet, statistics} = info;
  const {channelTitle, title, thumbnails, publishedAt} = snippet;
  
  const VIEW_FORMATTER = Intl.NumberFormat(undefined, {notation:
  "compact"})
  
  

  
  

  return (
    <div className='flex flex-col gap-2 p-2 m-2  cursor-pointer' >
      <img className='rounded-2xl p-1 w-full h-full relative aspect-video' alt='thumbnails' src={thumbnails.medium.url} />
    
      <ul>
        <li className='font-bold py-2 text-white' >{title}</li>
        <li className='text-sm  text-white'>{channelTitle}</li>
        <li className=' text-white text-sm'>{VIEW_FORMATTER.format(statistics?.viewCount)} views - {formatTimeAgo(publishedAt)} </li>
      </ul>
    </div>
  )
}

export default VideoCard