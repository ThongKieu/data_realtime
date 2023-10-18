import React from "react";
import { Input, IconButton } from "@material-tailwind/react"; // Thay thế 'your-ui-library' bằng thư viện UI của bạn
import {
    XMarkIcon,
    PencilSquareIcon,
    DocumentPlusIcon,
} from "@heroicons/react/24/outline";

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
    handleEdit,
}) => {
    return (
        <>
            <Input
                label={label}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                containerProps={containerProps}
                disabled={disabled}
                className={`shadow-none ${active ? "active" : ""}`}
            />

            {active ? (
                <IconButton
                    variant="text"
                    onClick={() => {
                        handleSetActive();
                        handleEdit();
                    }}
                    className={`shadow-none ${id == 'date_book' ? "hidden" : ""}`}
                >
                    <DocumentPlusIcon className="w-5 h-5" />
                </IconButton>
            ) : (
                <IconButton variant="text" onClick={() => handleSetActive()}  className={`shadow-none ${id == 'date_book' ? "hidden" : ""}`}>
                    <PencilSquareIcon className="w-5 h-5" />
                </IconButton>
            )}
        </>
    );
};

export default EditableInput;
