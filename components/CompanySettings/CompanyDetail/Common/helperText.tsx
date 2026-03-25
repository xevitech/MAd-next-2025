import React from 'react'
const HelperText = ({errorText}) => {
    return (<>
        <span style={{}} >
            <img
                src="/assets/error-outline-red.svg"
                alt=""
                style={{ width: '8px', height: '8px', }}
            />
            <span style={{ marginLeft: '3px', fontSize: '10px', color: '#d7282f' }}><>{errorText}</></span>
        </span>
    </>
    )

}

export default HelperText;