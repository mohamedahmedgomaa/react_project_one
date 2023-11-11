import React from "react";

const Loading = ({loading, error, children}) => {
    const cloneButton = React.cloneElement(children, {disabled: true}, "Loading...")
    const elementType = children?.type?.render?.displayName;

    const renderHandler = () => {
        if (elementType === "Button") {
            return (
                <>
                    {
                        loading ? (
                            cloneButton
                        ) : error ? (
                            <>
                                {children}
                                <p>{error}</p>
                            </>
                        ) : children
                    }
                </>
            );
        }
        return (
            <>
                {
                    loading ? (
                        <p>Loading please wait....</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : children
                }
            </>
        )
    }
    return renderHandler();
};

export default Loading;
