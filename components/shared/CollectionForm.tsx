'use client'

import { useCollection } from "@/app/(root)/collections/create/CollectionProvider"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import GradedDropdown from "./GradedDropdown"
import GemDropdown from "./GemDropdown"
import SetDropdown from "./SetDropdown"
import LangDropdown from "./LangDropdown"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { collectionsFormSchema } from "@/lib/validator";


type CollectionFormProps = {
    userId: string,
    type: "Create"  | "Update"
}

const CollectionForm = ({userId, type} : CollectionFormProps) => {

  const { form }  = useCollection()

  const router = useRouter()


  // adjust raw value using gradedValue
  const gradedVal = form.watch("isGraded")

  const handleSubmit = (values: z.infer<typeof collectionsFormSchema>) => {
    console.log("button submit pressed!")
    console.log(values)

    router.push(`/collections/create/builder`)
  }

  useEffect(() => {
    if (gradedVal === "yes") { form.setValue("isRaw", "no"); form.setValue("isGem", ""); }
    if (gradedVal === "no") { form.setValue("isRaw", "yes"); form.setValue("isGem", "no"); }
  }, [gradedVal, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, (errors) => {
        console.log("VALIDATION ERRORS:", errors)
      })} className="flex flex-col gap-5 items-center">
        <div className="w-3/4 md:w-4/5 min-h-64"> {/* form box */}
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-8 lg:items-baseline">
            <div className="flex flex-col gap-5 w-2/3 md:w-1/2 lg:w-1/3">
              {/* graded collection?*/}
              <FormField
                control={form.control}
                name="isGraded"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Is this a graded collection?*</FormLabel>
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
                    <FormItem className="">
                      <FormLabel>Are we talking GEM Mint!?*</FormLabel>
                      <FormControl>
                        <GemDropdown onChangeHandler={field.onChange} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }
            </div>
            {/* set based collection?*/}
            <FormField
              control={form.control}
              name="isSet"
              render={({ field }) => (
                <FormItem className="w-2/3 md:w-1/2 lg:w-1/3">
                  <FormLabel>We going for the full set?*</FormLabel>
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
                <FormItem className="w-2/3 md:w-1/2 lg:w-1/3">
                  <FormLabel>Chasing any prints? Or we universal*</FormLabel>
                  <FormControl>
                    <LangDropdown onChangeHandler={field.onChange} value={field.value} />                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}
          className="w-1/4 mt-8 bg-[#0D63A5] transition-colors hover:bg-[#083358]">{form.formState.isSubmitting ? ('Submitting...'): 'Start building'}
        </Button>
      </form>
    </Form>
  )
}

export default CollectionForm