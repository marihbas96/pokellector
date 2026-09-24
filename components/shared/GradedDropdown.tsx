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

type GradedDropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const GradedDropdown = ({ value, onChangeHandler }: GradedDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="selectfield">
        <SelectValue placeholder="Graded" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {binaryDropdown.map((item) => (
            <SelectItem key={item.label} value={item.value} className="select-item p-regular-14">
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default GradedDropdown