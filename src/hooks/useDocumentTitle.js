import { useEffect } from 'react'

import { useMatches } from 'react-router'

export const useDocumentTitle = () => {
    const matches = useMatches()

    useEffect(() => {
        const match = matches.find((match) => match.handle?.title)
        if (match?.handle?.title) {
            document.title = match.handle.title
        }
    }, [matches])
}
