import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../hookes/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null),
        linkID = useParams().id,
        getLink = useCallback(async () => {
            try {
                const fetched = await request(`/api/link/${linkID}`,
                    'GET',
                    null,
                    {
                        Authorization : `Bearer ${token}`
                    });
                setLink(fetched);
            } catch (e) {}
        }, [token, linkID, request]);

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) return <Loader />
    return (
        <>
            { !loading && link && <LinkCard link={link}/>}
        </>
    );
}