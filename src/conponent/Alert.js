import React from 'react'//rfc

export default function alert(props) {
    return (
        <div >



            {props.alert && <div className={`alert-${props.alert.type} alert-secondary`} role="alert">
                <strong>{props.alert.type==="danger"?"Error":props.alert.type}</strong>:{props.alert.message}
            </div>}
        </div>
    )
}
