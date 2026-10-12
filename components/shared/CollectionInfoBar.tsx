"use client";

import React from 'react'
import { useCollection } from '@/app/(root)/collections/create/CollectionProvider';
import { Card, CardContent } from '../ui/card';
import { CircleCheckBig, CircleCheck } from 'lucide-react';

const CollectionInfoBar = () => {
    const { form } = useCollection()

    return (
        <Card className="w-2/3 bg-[#EEF6FC] p-0 my-8 items-center">
            <CardContent className="pt-6 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto">
                    {form.watch("isGraded") === "yes" ? 
                    (<> <CircleCheckBig color="green" size={16} /> <p className="text-[#0D63A5]">Graded</p> </>) :
                    (<> <CircleCheck color="grey" size={16} /> <p className="text-[#001F3F]">Graded</p> </>)
                    }
                </div>
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto"> 
                    {form.watch("isGem") === "yes" ?
                    (<> <CircleCheckBig color="green" size={16} /> <p className="text-[#0D63A5]">Gem 10</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-[#001F3F]">Gem 10</p> </>) 
                    }
                </div>
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto">
                    {form.watch("isGraded") === "no" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-[#0D63A5]">Raw</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-[#001F3F]">Raw</p> </>)
                    }
                </div>              
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto">
                    {form.watch("isSet") === "yes" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-[#0D63A5]">Set-based</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-[#001F3F]">Set-based</p> </>)
                    }
                </div>
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto">
                {!["", "UNI"].includes(form.watch("isLang")) ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-[#0D63A5]">Lang-specific</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-[#001F3F]">Lang-specific</p> </>)
                    }
                </div>
                <div className="flex flex-row gap-2 items-center w-40 lg:w-44 xl:w-auto">
                    {form.watch("isLang") === "UNI" ?
                    (<> <CircleCheckBig color="green" size={18} /> <p className="text-[#0D63A5]">Universal</p> </>) :
                    (<> <CircleCheck color="grey" size={18} /> <p className="text-[#001F3F]">Universal</p> </>)
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default CollectionInfoBar;