import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendUnsubscribe } from "./controllers/newsLetterDB.js";

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
        {processing ? <h3>Aguarde, por favor...</h3> : null}
        {response ? <h3>{response}</h3> : null}
    </div>);
};

export default NewsLetterUnsubscribe;