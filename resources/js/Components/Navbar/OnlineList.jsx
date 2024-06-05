import React, { useState } from "react";
import AvatarImage from "../AvatarImage";
import {
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";

function OnlineList({ numberonline, avatarimage, name, listuser,auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <List className="p-0 my-2">
                <ListItem className="cursor-pointer py-1.5 font-medium " role="h3" onClick={toggleDropdown}>
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
            {isDropdownOpen && (
                <div className="border border-y-1 border-x-0 p-2 mt-2">
                    {/* Dropdown content goes here */}
                    <ul>
                        {listuser?.map((user) => (
                           user.id !== auth ?  <li key={user.id}>
                           <div className="flex flex-row justify-between p-1 items-center">
                               <span className="text-sm">{user.name}</span>
                               <span  className="bg-green-500 w-3 h-3 rounded-full p-1 "></span>
                           </div>
                       </li>:''
                        ))}
                    </ul>

                </div>
            )}
        </>
    );
}

export default OnlineList;
