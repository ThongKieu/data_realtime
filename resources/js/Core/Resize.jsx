import { useState, useEffect,useRef } from "react";

const useWindowSize = (x) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight - x,
    });
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight - x,
        });
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

const useEditableCell = (params, actionType) => {
    const inputRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const updateCellData = (e) => {
        let newValue = e.target.value;
        const dataUpdate = {
            action: actionType,
            id: params.id,
            newValue: newValue,
        };

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            fetchData(dataUpdate); // Hàm fetchData mà bạn định nghĩa để làm API call
            setIsEditing(false);
        }
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return {
        inputRef,
        isEditing,
        handleEdit,
        handleBlur,
        updateCellData,
    };
};

export default { useEditableCell, useWindowSize };
