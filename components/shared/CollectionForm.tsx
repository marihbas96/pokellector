'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { CircleCheck, CircleCheckBig } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { collectionsFormSchema } from "@/lib/validator"
import { collectionDefaultValues } from "@/constants"
import GradedDropdown from "./GradedDropdown"
import GemDropdown from "./GemDropdown"
import SetDropdown from "./SetDropdown"
import LangDropdown from "./LangDropdown"
import { useEffect } from "react"


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
  
  // adjust raw value using gradedValue
  const gradedVal = form.watch("isGraded")

  useEffect(() => {
    if (gradedVal === "yes") { form.setValue("isRaw", "no"); form.setValue("isGem", ""); }
    if (gradedVal === "no") { form.setValue("isRaw", "yes"); form.setValue("isGem", "no"); }
  }, [gradedVal, form])

  useEffect

  //2. Define a submit handler
  function onSubmit(values: z.infer<typeof collectionsFormSchema>) {
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("VALIDATION ERRORS:", errors)
      })} className="flex flex-col gap-5">
        <div className="flex flex-row justify-between"> {/* form box */}
          <div className="flex flex-col gap-5 w-2/3">
            <div className="flex flex-row gap-5">
              {/* graded collection?*/}
              <FormField
                control={form.control}
                name="isGraded"
                render={({ field }) => (
                  <FormItem className="w-1/3">
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
                    <FormItem className="w-1/3">
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
                <FormItem className="w-1/3">
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
                <FormItem className="w-1/3">
                  <FormLabel>Chasing any prints? Or we universal*</FormLabel>
                  <FormControl>
                    <LangDropdown onChangeHandler={field.onChange} value={field.value} />                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Card className="h-40">
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-row gap-6">
                <div className="flex flex-row gap-2 w-1/4">
                 {form.watch("isGraded") === "yes" ? 
                  (<> <CircleCheckBig color="green" size={16} /> <p className="text-black-400">Graded</p> </>) :
                  (<> <CircleCheck color="grey" size={16} /> <p className="text-grey-400">Graded</p> </>)
                 }
                </div>
                <div className="flex flex-row gap-2 w-1/4"> 
                  {form.watch("isGem") === "yes" ?
                    (<> <CircleCheckBig color="green" size={16} /> <p className="text-black-400">Gem 10</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-grey-400">Gem 10</p> </>) 
                  }
                </div>
                <div className="flex flex-row gap-2 w-1/4">
                  {form.watch("isGraded") === "no" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-black-400">Raw</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-grey-400">Raw</p> </>)
                  }
                </div>              
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 w-1/3">
                  {form.watch("isSet") === "yes" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-black-400">Set-based</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-grey-400">Set-based</p> </>)
                  }
                </div>
                <div className="flex flex-row gap-2 w-1/3">
                {!["", "UNI"].includes(form.watch("isLang")) ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-black-400">Lang-specific</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-grey-400">Lang-specific</p> </>)
                  }
                </div>
                <div className="flex flex-row gap-2 w-1/3">
                  {form.watch("isLang") === "UNI" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-black-400">Universal</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-grey-400">Universal</p> </>)
                  }
                </div>  
              </div>
            </CardContent>
          </Card>
        </div>
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}
          className="w-1/4 bg-[#FFCB05] transition-colors hover:bg-[#3B4CCA]">{form.formState.isSubmitting ? ('Submitting...'): 'Start building'}</Button>
      </form>
    </Form>
  )
}

export default CollectionForm