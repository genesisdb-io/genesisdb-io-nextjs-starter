import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Customer } from "@/lib/interfaces";
import { CustomerProjection } from "@/lib/projections/customer-projection";
import { Button } from "@/components/ui/button";
import CustomerForm from "./customer-form";
import RemoveDialog from "./remove-dialog";
import { Client } from "genesisdb";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = 'force-dynamic'

export default async function GenesisDBDemo() {

  const client = new Client();
  const customerEvents = await client.streamEvents("/customer")
  const customers = new CustomerProjection().project(customerEvents)

  console.log(customerEvents);

  return <div className="min-h-screen p-8 pb-20 sm:p-20">
    <main className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Genesis DB Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to the Genesis DB docs - your event sourcing sidekick. A database engine developed specifically for event sourcing. It handles the writing, reading, and watching of events with native precision - all while keeping consistency, reliability, and usability front and center. Whether you&apos;re just exploring event sourcing, comparing tools, or building a production-grade system.
        </p>
      </div>

      <div className="flex flex-row w-full justify-between gap-2">
        <Button variant="outline" asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Add customer</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add new customer</SheetTitle>
              <SheetDescription>
                Add a new customer to the database.
              </SheetDescription>
            </SheetHeader>
            <CustomerForm />
          </SheetContent>
        </Sheet>
      </div>

      <Table className="my-8">
        <TableHeader>
          <TableRow>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer: Customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.firstName}</TableCell>
              <TableCell>{customer.lastName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell className="text-end flex flex-row justify-end gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit customer</SheetTitle>
                      <SheetDescription>
                        Edit the customer&apos;s data.
                      </SheetDescription>
                    </SheetHeader>
                    <CustomerForm customer={customer} />
                  </SheetContent>
                </Sheet>
                <RemoveDialog customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  </div>;
}
