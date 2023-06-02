import React from 'react';

export const Showdata(data){
    return ( <ul>
        data.map((dato) => { return ( <li> dato </li>)})
    </ul>

    )
}