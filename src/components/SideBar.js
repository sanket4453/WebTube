import React, { Children, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../utils/store'
import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy, User2Icon, UserCircle2, UserCog2Icon } from 'lucide-react';
import {playlists, subscriptions} from '../data/sideBarData'
import { GOOGLE_API_KEY, YOUTUBE_SUGGESTION_SEARCH } from '../utils/constant';
import { addVideos } from '../utils/videoSlice';
import useSearchData from '../utils/Hooks/useSearchData';

const SideBar = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

 


  

  if(!isMenuOpen) return null;
  return (
    <>
    <aside className='sticky top-0 overflow-y-auto
    scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden'>
      <SmallSidebarItem Icon={Home} title="Home" url="/"/>
      <SmallSidebarItem Icon={Repeat} title="Shorts" url="/" />
      <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/" />
      <SmallSidebarItem Icon={Library} title="Library" url="/" />
    </aside>
    <aside className='w-56 lg:sticky absolute top-0
    overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex hidden '>
      <LargeSidebarSection >
        <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
        <LargeSidebarItem Icon={Clapperboard} title="Subscription" url="/"/>
      </LargeSidebarSection>
      <hr />
      <LargeSidebarSection visibleItemCount={5}>
        <LargeSidebarItem Icon={Library} title="Library" url="/" />
        <LargeSidebarItem Icon={History} title="History" url="/" />
        <LargeSidebarItem Icon={PlaySquare} title="Your Videos" url="/"/>
        <LargeSidebarItem Icon={Clock} title="Watch Later" url="/"/>
      </LargeSidebarSection>
      {playlists.map((playlist) => (
        <LargeSidebarItem 
        key={playlist?.id}
        Icon={ListVideo}
        title={playlist.name}
        url="/"
        
        />
      ))}
      
      <hr/>
        <LargeSidebarSection title="Subscription">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem 
            key={subscription.id}
            Icon={UserCircle2}
            title={subscription.channelName}
            url="/"
          />
          ))}
          
        </LargeSidebarSection>
        <hr/>

        <LargeSidebarSection title="Explore">
            <LargeSidebarItem Icon={Flame} title="Trending" url="/" />
            <LargeSidebarItem Icon={ShoppingBag} title="Shopping" url="/" />
            <LargeSidebarItem Icon={Music2} title="Music" url="/" />
            <LargeSidebarItem Icon={Film} title="Movies & TV" url="/" />
            <LargeSidebarItem Icon={Radio} title="Live" url="/" />
            <LargeSidebarItem Icon={Gamepad2} title="Gaming" url="/" />
            <LargeSidebarItem Icon={Newspaper} title="News" url="/" />
            <LargeSidebarItem Icon={Trophy} title="Sports" url="/" />
            <LargeSidebarItem Icon={Lightbulb} title="Learning" url="/" />
            <LargeSidebarItem Icon={Shirt} title="Fashion & Beauty" url="/" />
            <LargeSidebarItem Icon={Podcast} title="Podcasts" url="/" />
        </LargeSidebarSection>

    </aside>
    </>
  )  
}

const LargeSidebarSection = ({children,title,visibleItemCount = Number.POSITIVE_INFINITY}) =>{

  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0,visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return(
    <div>
      {title && <div className='ml-4 mt-2 text-lg mb-1 text-white'>{title} </div>}
      {visibleChildren}
      {showExpandButton && (
        <button
        onClick={()=> setIsExpanded(e => !e)}
        className='w-full flex items-center rounded-lg gap-4 p-3 text-white'>
          <ButtonIcon className='w-6 h-6 text-white' />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </button>
      )}
    </div>
  )
    

}

const LargeSidebarItem = ({Icon, title, url, isActive}) =>{
  // useSearchData(title);
  
  return(
    <a 
    // onClick={()=>handleClick(title)}
    href={url}
    className='w-full flex items-center rounded-lg gap-4 p-3 text-white'
    >
      <Icon className="w-6 h-6 text-white" />
      <div className='whitespace-nowrap overflow-hidden text-ellipsis text-white'>{title}</div>

    </a>
  )

}

function SmallSidebarItem ({Icon, title, url}){
  return(
    <a 
      href={url}
      className='py-4 px-1 flex flex-col items-center rounded-l gap-1 text-white'
    >
      <Icon className="w-6 h-6 text-white" />
      <div className='text-sm text-white'>{title}</div>
    </a>
  )

}

export default SideBar