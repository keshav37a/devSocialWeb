/* eslint-disable react/jsx-no-useless-fragment */
import React, { Suspense } from 'react'

import { Loading } from '@components'

export const SuspenseWrapper = ({ className, noFallback, fallback, children }) => (
    <Suspense fallback={noFallback ? <></> : (fallback ?? <Loading />)}>
        <div className={`suspense-wrapper ${className ?? ''}`}>{children}</div>
    </Suspense>
)

export default SuspenseWrapper
