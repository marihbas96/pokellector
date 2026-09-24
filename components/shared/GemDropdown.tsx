import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { binaryDropdown } from "../../constants/index"

type GemDropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const GemDropdown = ({ value, onChangeHandler }: GemDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="selectfield">
            <SelectValue placeholder="Gem" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            {binaryDropdown.map((item) => (
                <SelectItem key={item.value} value={item.value} className="select-item p-regular-14">
                {item.label}
                </SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
    </Select> 
  )
}

export default GemDropdown