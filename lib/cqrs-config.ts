import {
  CommandRouter,
  GenesisDBAdapter,
  ConfiguredEventTypeResolver,
  JsonEventDataMarshaller,
  InMemoryStateCache,
  SourcingMode
} from "cqrskit"
import { CustomerHandlers } from "./commands/customer-commands"
import {
  CustomerRecordedEvent,
  CustomerDataChangedEvent,
  CustomerRemovedEvent
} from "./events/customer-events"
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
  RemoveCustomerCommand
} from "./commands/customer-command-types"

// Null class for stateless command handlers
class NullState {}

// Configure event store adapter
const eventStore = new GenesisDBAdapter({
  apiUrl: process.env.GENESISDB_API_URL || 'http://localhost:8080',
  authToken: process.env.GENESISDB_AUTH_TOKEN || 'secret',
  source: process.env.GENESISDB_SOURCE || 'tag:demo.genesisdb.io'
})

// Configure event type resolver - only NEW types for CommandRouter (for writing)
// The CommandRouter will publish events with these new types
const eventTypeResolver = new ConfiguredEventTypeResolver()
  .register('io.genesisdb.demo.customer-recorded', CustomerRecordedEvent)
  .register('io.genesisdb.demo.customer-data-changed', CustomerDataChangedEvent)
  .register('io.genesisdb.demo.customer-removed', CustomerRemovedEvent)

// Create customer handlers instance
const customerHandlers = new CustomerHandlers()

// Create command router
export const commandRouter = new CommandRouter({
  eventStore,
  eventTypeResolver,
  eventDataMarshaller: new JsonEventDataMarshaller(),
  commandHandlers: [
    {
      instanceClass: NullState,
      commandClass: CreateCustomerCommand,
      handler: customerHandlers.handleCreateCustomer.bind(customerHandlers),
      sourcingMode: SourcingMode.NONE
    },
    {
      instanceClass: NullState,
      commandClass: UpdateCustomerCommand,
      handler: customerHandlers.handleUpdateCustomer.bind(customerHandlers),
      sourcingMode: SourcingMode.NONE
    },
    {
      instanceClass: NullState,
      commandClass: RemoveCustomerCommand,
      handler: customerHandlers.handleRemoveCustomer.bind(customerHandlers),
      sourcingMode: SourcingMode.NONE
    }
  ],
  stateRebuildingHandlers: [],
  eventSource: process.env.GENESISDB_SOURCE || 'tag:demo.genesisdb.io',
  cache: new InMemoryStateCache(1000)
})
