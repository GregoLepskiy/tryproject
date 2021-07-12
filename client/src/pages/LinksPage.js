import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hookes/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([]),
        {loading, request} = useHttp(),
        {token} = useContext(AuthContext),
        fetchLinks = useCallback(async () => {
            try{
                const fetched = await request('/api/link',
                    'GET',
                    null,
                    {
                        Authorization: `Bearer ${token}`
                    });
                setLinks(fetched);
            } catch (e) {}
        }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading)
        return <Loader />
    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
}