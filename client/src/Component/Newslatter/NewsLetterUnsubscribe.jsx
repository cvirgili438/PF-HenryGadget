import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendUnsubscribe } from "./controllerNewsLetter.js";

const NewsLetterUnsubscribe = () => {
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const [processing, setProcessing] = useState(true);
    const [response, setResponse] = useState(false);

    useEffect(async () => {
        setResponse(await sendUnsubscribe(query.get('email'), query.get('code')));
    }, []);

    useEffect(() => {
        setProcessing(false);
    }, [response]);

    return(<div>
        <p>a</p>
        <p>a</p>
        {processing ?
        <div>Aguarde, por favor...</div> : null}
        {response ?
        <div>{response}</div> :
        <div>{response}</div>}
    </div>);
};

export default NewsLetterUnsubscribe;