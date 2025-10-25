"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import CustomerForm from "./customer-form"
import { Customer } from "@/lib/interfaces"

export default function CustomerSheet({ customer }: { customer?: Customer }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          {customer ? "Edit" : "Add customer"}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {customer ? "Edit customer" : "Add new customer"}
          </SheetTitle>
          <SheetDescription>
            {customer ? "Edit the customer's data." : "Add a new customer to the database."}
          </SheetDescription>
        </SheetHeader>
        <CustomerForm customer={customer} onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
