"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Customer } from "@/lib/interfaces"
import { removeCustomer } from "./actions"

export default function RemoveDialog({ customer }: { customer: Customer }) {

  const router = useRouter()

  const handleRemove = async () => {
    await removeCustomer({
      customerId: customer.id,
    })
    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action deletes the customer.
          </DialogDescription>
          <div className="w-full flex flex-row justify-end">
            <Button variant="destructive" onClick={handleRemove}>Remove</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
