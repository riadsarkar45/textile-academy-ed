import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Alert = ({ message, messageType }) => {
    let bgColor, textColor, borderColor;
    if (messageType === "error") {
        bgColor = "bg-red-500";
        textColor = "text-red-900";
        borderColor = "border-red-500";
    } else if (messageType === "success") {
        bgColor = "bg-green-500";
        textColor = "text-green-900";
        borderColor = "border-green-500";
    } else if (messageType === "loading") {
        bgColor = "bg-yellow-500";
        textColor = "text-yellow-900";
        borderColor = "border-yellow-500";
    } else if(messageType === "info"){
        bgColor = "bg-blue-500";
        textColor = "text-blue-900";
        borderColor = "border-blue-500";
    }
    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 `}>
            <div
                className={`${bgColor} ${textColor} ${borderColor}
                flex justify-between items-center gap-8
                border px-6 py-4 rounded-2xl shadow-lg
                animate-slideDown backdrop-blur-sm bg-opacity-60 mt-5 mb-b`}
            >
                <span className={`${messageType === "loading" && "flex justify-between items-center gap-4"}`}>{messageType === "loading" && <span className="animate-spin"><AiOutlineLoading3Quarters /></span> }{message}</span>
               
            </div>
        </div>
    );
};

export default Alert;