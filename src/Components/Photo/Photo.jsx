import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Photo(props) {

    const [SRC, setSRC] = useState(props.URL)

    useEffect(() => {
        console.log("URL", props.URL)
        setSRC(props.URL)
    }, [props.URL])


    return (
        <img {...props} src={SRC}></img>
    )
}
 