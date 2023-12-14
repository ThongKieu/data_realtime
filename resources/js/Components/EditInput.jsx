import React, { useState } from "react";
import { Input, IconButton, Tooltip } from "@material-tailwind/react";
import { CogIcon } from "@heroicons/react/24/outline";

const EditableInput = ({
    label,
    id,
    name,
    value,
    onChange,
    containerProps,
    disabled,
    active,
    handleSetActive,
    // handleEdit,
    classNameChild,
}) => {
    const [editableInput, setEditableInput] = useState(null);

    const handleEditStart = (id) => {
        setEditableInput(id);
    };
    return (
        <>
            <Input
                label={label}
                id={id}
                name={name}
                value={value}
                color="green"
                onFocus={() => handleEditStart(id)}
                onChange={onChange}
                containerProps={containerProps}
                disabled={id == "date_book" ? disabled : ""}
                // onBlur={handleEditEnd}
                className={`shadow-none ${
                    editableInput === id ? "editing" : ""
                } ${classNameChild}`}
            />
            {editableInput === id && (
                <IconButton variant="text" className="edit-icon">
                    <CogIcon className="w-5 h-5 text-green-500" />
                </IconButton>
            )}
        </>
    );
};

export default EditableInput;
