import { useState } from 'react'

import { ChevronDownIcon } from 'icons'

export const Dropdown = ({
    items = [],
    displayItemLabelKey,
    initialSelectedItem,
    initialSelectedValue,
    label,
    onChange,
    valueKey,
}) => {
    const getInitialSelectedItemFromKeyValues = (key, value) => items.find((item) => value === item[key])
    const getInitialSelectedItem = () => {
        if (initialSelectedItem) {
            return initialSelectedItem
        } else if (valueKey && initialSelectedValue) {
            return getInitialSelectedItemFromKeyValues(valueKey, initialSelectedValue) ?? items?.[0]
        } else {
            return items?.[0]
        }
    }

    const { className: labelClassName = '', content: labelContent } = label || {}
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(getInitialSelectedItem())

    const handleOpenDropdown = () => {
        setIsOpen((prev) => !prev)
    }

    const handleChangeDropdownValue = (item) => {
        onChange?.(item)
        setSelectedItem(item)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-block text-left">
            <fieldset className="fieldset">
                {label ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
                <button
                    className="input inline-flex w-48 cursor-pointer items-center justify-between rounded-2xl border border-gray-300 px-4 py-2 text-sm font-medium text-[#EDF1FE] shadow-sm hover:bg-[#2b2f37] focus:outline-none"
                    onClick={handleOpenDropdown}
                >
                    {displayItemLabelKey ? selectedItem[displayItemLabelKey] : String(selectedItem)}
                    <ChevronDownIcon
                        className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </fieldset>

            {isOpen ? (
                <div className="dropdown-content ring-opacity-5 absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-2xl bg-base-300 shadow-lg ring-1 ring-black focus:outline-none">
                    <div className="py-1">
                        {items?.map((item, index) => {
                            const { id, _id, value, ...restProps } = item
                            return (
                                <button
                                    className={`w-full cursor-pointer px-4 py-2 text-left text-sm text-[#EDF1FE] hover:bg-[#2b2f37] ${index === 0 ? 'hover:rounded-t-2xl' : ''} ${index === items.length - 1 ? 'hover:rounded-b-2xl' : ''}`}
                                    key={id || _id || value}
                                    onClick={() => handleChangeDropdownValue(item)}
                                >
                                    {displayItemLabelKey ? restProps[displayItemLabelKey] : String(item)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
