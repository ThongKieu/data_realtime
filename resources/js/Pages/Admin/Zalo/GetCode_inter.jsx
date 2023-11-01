import React from "react";
import { Button, Input } from "@material-tailwind/react";
function GetCode_inter({
    handleOnclick,
    valueInput,
    labelBtn,
    colorBtn,
    classNameBtn,
    classNameInput,
}) {
    return (
        <div className="flex flex-row justify-center gap-3 p-1">
            <Button
                className={`w-[200px] ${classNameBtn}`}
                color={colorBtn}
                disabled={false}
                onClick={handleOnclick}
            >
                {labelBtn}
            </Button>
            <div className="w-[42rem]">
                <Input
                    className={`${classNameInput}`}
                    value={valueInput}
                    disabled
                />
            </div>
        </div>
    );
}

export default GetCode_inter;
