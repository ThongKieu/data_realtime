import React, { useState, useRef, useEffect } from "react";
import { Input, IconButton } from "@material-tailwind/react";
import { CogIcon } from "@heroicons/react/24/outline";

const EditableInput = ({
    label,
    id,
    name,
    value,
    onChange,
    containerProps,
    disabled,
    classNameChild,
}) => {
    const [editableInput, setEditableInput] = useState(null);
    const handleEditStart = (id) => {
        setEditableInput(id);
    };
    const inputRef = useRef(null);

    // Sử dụng useEffect để kiểm soát autoFocus
    useEffect(() => {
        if (inputRef.current) {
            // autoFocus chỉ được sử dụng khi nó là true
            inputRef.current.focus();
        }

    }, []);
    return (
        <>
            <Input
                label={label}
                id={id}
                name={name}
                value={value}
                color="green"
                ref={inputRef}
                autoFocus={false}
                onFocus={() => handleEditStart(id)}
                onChange={onChange}
                containerProps={containerProps}
                disabled={id == "date_book" ? disabled : ""}
                className={`shadow-none ${
                    editableInput === id ? "editing" : ""
                } ${classNameChild}`}
            />
            {editableInput === id && (
                <IconButton variant="text">
                    <CogIcon className="w-5 h-5 text-green-500" />
                </IconButton>
            )}
        </>
    );
};

export default EditableInput;
