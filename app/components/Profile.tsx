'use client';

import React from 'react';

function Profile(props: any) {
    const sex = (e: any) => {
        console.log(e);
    };
    function handleKeyDown(event: any) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const inputValue = event.target.value;
            console.log(inputValue);
            props.sex(inputValue, 2);
        }
    }
    return (
        <form action={sex}>
            <textarea
                defaultValue={props.victim.description}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
}

export default Profile;
