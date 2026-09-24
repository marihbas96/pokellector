import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { languageDropdown } from "../../constants/index"

type LangDropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const LangDropdown = ({ value, onChangeHandler }: LangDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="selectfield">
            <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            {languageDropdown.map((item) => (
                <SelectItem key={item.value} value={item.value} className="select-item p-regular-14">
                {item.label}
                </SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
    </Select> 
  )
}

export default LangDropdown