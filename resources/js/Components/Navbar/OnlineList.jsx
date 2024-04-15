import React, { useState, useEffect } from "react";
import AvatarImage from "../AvatarImage";
import {
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";

function OnlineList({ numberonline, avatarimage, name }) {
    return (
        <List className="p-0 my-2">
            <ListItem className="cursor-auto py-1.5 font-medium " role="h3">
                <AvatarImage children={avatarimage}></AvatarImage>
                <p className="pl-3">{name}</p>
                <ListItemSuffix>
                    <Chip
                        value={numberonline}
                        variant="ghost"
                        size="sm"
                        className="px-2 py-1 text-xs rounded-full group-hover:bg-white/20 group-hover:text-white"
                    />
                </ListItemSuffix>
            </ListItem>
        </List>
    );
}

export default OnlineList;

