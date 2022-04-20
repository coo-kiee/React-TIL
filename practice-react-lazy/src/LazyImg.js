import { Suspense } from 'react'

const LazyImg = () => {
    return (
        <Suspense fallback={<div></div>}>
            <img src="/logo192.png" alt="" />
        </Suspense>
    );
}

export default LazyImg;