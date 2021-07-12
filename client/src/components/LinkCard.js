import React from "react";

export const LinkCard = ( {link} ) => {
    return (
        <>
            <h2>LINK</h2>

            <p>YOUR LINK:
                <a href={link.to} target='_blank'
                             rel='noopener noreferrer'> {link.to}
                </a>
            </p>
            <p>FROM:
                <a href={link.from} target='_blank'
                             rel='noopener noreferrer'> {link.from}
                </a>
            </p>
            <p>AMOUNT OF CLICKS: <strong>
                     {link.clicks}
                </strong>
            </p>
            <p>DATE OF CREATION: <strong>
                     {new Date(link.date).toLocaleDateString()}
                </strong>
            </p>
        </>
    )
}