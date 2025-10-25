import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Customer } from "@/lib/interfaces";
import { CustomerProjection } from "@/lib/projections/customer-projection";
import { Button } from "@/components/ui/button";
import CustomerSheet from "./customer-sheet";
import RemoveDialog from "./remove-dialog";
import {
  GenesisDBAdapter,
  RawEvent
} from "cqrskit";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Events from "./events";

export const dynamic = 'force-dynamic'

export default async function GenesisDBDemo() {

  // Use cqrskit's GenesisDBAdapter to stream events
  const eventStore = new GenesisDBAdapter({
    apiUrl: process.env.GENESISDB_API_URL || 'http://localhost:8080',
    authToken: process.env.GENESISDB_AUTH_TOKEN || 'secret',
    source: process.env.GENESISDB_SOURCE || 'tag:demo.genesisdb.io'
  });


  // Create projection and rebuild from events
  const projection = new CustomerProjection();
  const customerEvents: RawEvent[] = [];

  for await (const rawEvent of eventStore.streamEvents("/customer", {}, true)) {
    customerEvents.push(rawEvent);

    // Apply event to projection based on type (handle raw data directly)
    try {
      switch (rawEvent.type) {
        case 'io.genesisdb.demo.customer-recorded':
        case 'io.genesisdb.app.customer-added':
          await projection.onCustomerRecorded(rawEvent.data, rawEvent.subject);
          break;

        case 'io.genesisdb.demo.customer-data-changed':
        case 'io.genesisdb.app.customer-updated':
        case 'io.genesisdb.app.customer-personaldata-changed':
          await projection.onCustomerDataChanged(rawEvent.data, rawEvent.subject);
          break;

        case 'io.genesisdb.demo.customer-removed':
        case 'io.genesisdb.app.customer-removed':
          await projection.onCustomerRemoved(rawEvent.data, rawEvent.subject);
          break;

        default:
          console.warn('Unknown event type:', rawEvent.type);
      }
    } catch (error) {
      console.error('Error processing event:', rawEvent.type, error);
    }
  }

  const customers = projection.getAllCustomers()

  console.log('Total events:', customerEvents.length);
  console.log('Total customers in projection:', customers.length);
  console.log('Customers:', customers);

  return <div className="min-h-screen p-8 pb-20 sm:p-20">
    <main className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Genesis DB Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to the Genesis DB - your event sourcing sidekick. A database engine developed specifically for event sourcing. It handles the writing, reading, and watching of events with native precision - all while keeping consistency, reliability, and usability front and center. Whether you&apos;re just exploring event sourcing, comparing tools, or building a production-grade system.
        </p>
      </div>

      <div className="flex flex-row w-full justify-between gap-2">
        <Button variant="outline" asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>
        </Button>
        <CustomerSheet />
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
              <TableCell>{customer.emailAddress}</TableCell>
              <TableCell className="text-end flex flex-row justify-end gap-2">
                <CustomerSheet customer={customer} />
                <RemoveDialog customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card>
        <CardHeader>
          <CardTitle>Written events</CardTitle>
          <CardDescription>
            The events that have been written to Genesis DB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Events customerEvents={customerEvents} />
        </CardContent>
      </Card>
    </main>
  </div>;
}
