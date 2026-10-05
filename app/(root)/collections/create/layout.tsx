import { CollectionProvider } from './CollectionProvider';
import CollectionInfoBar from "@/components/shared/CollectionInfoBar"
import React from 'react'

export default function CollectionCreateLayout({
    children,}: {
        children: React.ReactNode;
    }) {
    return (
        <CollectionProvider>
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">What's your collection about?</h3>
            </section>
            <CollectionInfoBar></CollectionInfoBar>
            <div className="wrapper my-8">
                <main>{children}</main>
            </div>
        </>
        </CollectionProvider>
  )
}