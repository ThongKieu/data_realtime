import React, { useState, useEffect, } from 'react'
import AvatarImage from '../AvatarImage';
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,

} from "@material-tailwind/react";


function OnlineList( {numberOnline,avatarImage}) {
  return (
    <List className="p-0 my-2">
      <ListItem className="cursor-pointer py-1.5 font-medium ">
        <AvatarImage children={avatarImage}></AvatarImage>
        <ListItemSuffix>
          <Chip
            value={numberOnline}
            variant="ghost"
            size="sm"
            className="px-2 py-1 text-xs rounded-full group-hover:bg-white/20 group-hover:text-white"
          />
        </ListItemSuffix>
      </ListItem>
    </List>

  )
}

export default OnlineList
