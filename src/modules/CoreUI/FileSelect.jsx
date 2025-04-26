import { useRef, useState } from 'react'

import { Button, Input } from '@CoreUI'
import { CrossIcon } from 'icons'

export const FileSelect = ({
    accept = '',
    name = '',
    btnProps,
    errorProps,
    inputProps,
    labelProps,
    onFileRemove,
    onFileSelect,
}) => {
    const { className: btnClassName = '', label = 'Select a file' } = btnProps || {}
    const { className: labelClassName = '', content: labelContent } = labelProps || {}
    const { className: errorClassName = '', content: errorContent } = errorProps || {}

    const fileInputRef = useRef(null)
    const [fileName, setFileName] = useState('')

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setFileName(file.name)
            onFileSelect?.(file)
        }
    }

    const handleDeleteFile = () => {
        setFileName(null)
        onFileRemove()
    }

    return (
        <fieldset className="fieldset min-h-[5.5rem]">
            {labelProps ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
            <Input
                inputProps={{ className: 'hidden', accept, name }}
                onChange={handleChange}
                ref={fileInputRef}
                type="file"
                {...inputProps}
            />
            <Button className={btnClassName} label={label} {...btnProps} onClick={handleClick} />
            {fileName ? (
                <div className="flex items-center">
                    <div className="mr-4 font-medium text-gray-700">{fileName}</div>
                    <CrossIcon className="h-3 w-3 cursor-pointer" onClick={handleDeleteFile} />
                </div>
            ) : null}
            {errorProps ? <span className={`text-red-400 ${errorClassName}`}>{errorContent}</span> : null}
        </fieldset>
    )
}
