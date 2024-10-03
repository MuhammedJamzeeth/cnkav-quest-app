import React from 'react'
import { useParams } from 'react-router-dom';

const SingleAffiliatedProduct =()=>{
    const { id } = useParams();
return (<>
    HIIIIIIIIIIIIIIIIII {id}
</>);
}

export default SingleAffiliatedProduct;