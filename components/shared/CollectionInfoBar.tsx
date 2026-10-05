"use client";

import React from 'react'
import { useCollection } from '@/app/(root)/collections/create/CollectionProvider';
import { Card, CardContent } from '../ui/card';
import { CircleCheckBig, CircleCheck } from 'lucide-react';

const CollectionInfoBar = () => {
    const { form } = useCollection()

    return (
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
    )
}

export default CollectionInfoBar;