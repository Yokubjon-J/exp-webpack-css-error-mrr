import { Suspense, lazy, useEffect, useState } from 'react';
import FacebookCircularProgress from './components/Loading.jsx';

const Editor = lazy(() => import('./Editor.jsx'));

export default () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return (
            <Suspense fallback={<FacebookCircularProgress/>}>
                <Editor />
            </Suspense>
        )
    } else {
        return null
    }
}