import React from "react";

function FlashMessage({title, subTitle, type}){
    console.log(title)
    if(type == "success"){
        return (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">{title}</span> {subTitle}
            </div>
        )
    }
    if(type == "error"){
        return(
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{title}</span> {subTitle}
            </div>
        )
    }
    if(type == "info"){
        return(
           <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">{title}</span> {subTitle}
            </div>
        )
    }
}

export default FlashMessage