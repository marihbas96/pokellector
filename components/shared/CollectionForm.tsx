'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { collectionsFormSchema } from "@/lib/validator"
import { collectionDefaultValues } from "@/constants"
import GradedDropdown from "./GradedDropdown"
import GemDropdown from "./GemDropdown"
import SetDropdown from "./SetDropdown"
import LangDropdown from "./LangDropdown"


type CollectionFormProps = {
    userId: string,
    type: "Create"  | "Update"
}

const CollectionForm = ({userId, type} : CollectionFormProps) => {
  const initialValues = collectionDefaultValues;

  const form = useForm<z.infer<typeof collectionsFormSchema>> ({
    resolver: zodResolver(collectionsFormSchema),
    defaultValues: initialValues
  })
  
  //2. Define a submit handler
  function onSubmit(values: z.infer<typeof collectionsFormSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.

    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row">
            {/* graded collection?*/}
            <FormField
              control={form.control}
              name="isGraded"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Is this a graded collection?</FormLabel>
                  <FormControl>
                    <GradedDropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* gem mint collection? -- conditional*/}
            { form.watch("isGraded") === "yes" &&
              <FormField
                control={form.control}
                name="isGem"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Are we talking GEM Mint!?</FormLabel>
                    <FormControl>
                      <GemDropdown onChangeHandler={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            }
            {/* set based collection?*/}
            <FormField
              control={form.control}
              name="isSet"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>We going for the full set?</FormLabel>
                  <FormControl>
                    <SetDropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* language based collection?*/}
            <FormField
              control={form.control}
              name="isLang"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Chasing any prints or we universal?</FormLabel>
                  <FormControl>
                    <LangDropdown onChangeHandler={field.onChange} value={field.value} />                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CollectionForm