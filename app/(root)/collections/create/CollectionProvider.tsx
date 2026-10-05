"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { createContext, useContext } from "react";
import { collectionDefaultValues } from "@/constants";
import { collectionsFormSchema } from "@/lib/validator";

// form values or schema
type CollectionFormValues = z.infer<typeof collectionsFormSchema>;

type CollectionContextType = {
  form: UseFormReturn<CollectionFormValues>;  
};

const CollectionContext = createContext<CollectionContextType | undefined>(
    undefined
);

export function CollectionProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    // form istanciation
    const form = useForm<CollectionFormValues>({
        resolver: zodResolver(collectionsFormSchema),
        defaultValues: collectionDefaultValues,
    });


    return (
        <CollectionContext.Provider value={{ form }}>
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection() {
    const context = useContext(CollectionContext);

    if (!context) {
        throw new Error(
            "useCollection must be used inside a CollectionProvider"
        );
    }

    return context;
}