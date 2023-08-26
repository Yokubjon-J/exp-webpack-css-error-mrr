import { Suspense, lazy, useEffect, useState } from 'react';

const Editor = lazy(() => import('./Editor.jsx'));

export default () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return (
            <Suspense fallback={"loading editor..."}>
                <Editor />
            </Suspense>
        )
    } else {
        return null
    }
}