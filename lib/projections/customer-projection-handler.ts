import { EventHandlerDefinition, RawEvent } from "cqrskit";
import { CustomerProjection } from "./customer-projection";
import {
  CustomerRecordedEvent,
  CustomerDataChangedEvent,
  CustomerRemovedEvent
} from "../events/customer-events";

/**
 * Creates event handler definitions for the customer projection
 */
export function createCustomerProjectionHandlers(
  projection: CustomerProjection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): EventHandlerDefinition<any>[] {
  return [
    {
      group: 'customer-list',
      eventClass: CustomerRecordedEvent,
      handler: async (event: CustomerRecordedEvent, _metadata: Record<string, unknown>, rawEvent: RawEvent) => {
        await projection.onCustomerRecorded(event, rawEvent.subject);
      }
    },
    {
      group: 'customer-list',
      eventClass: CustomerDataChangedEvent,
      handler: async (event: CustomerDataChangedEvent, _metadata: Record<string, unknown>, rawEvent: RawEvent) => {
        await projection.onCustomerDataChanged(event, rawEvent.subject);
      }
    },
    {
      group: 'customer-list',
      eventClass: CustomerRemovedEvent,
      handler: async (event: CustomerRemovedEvent, _metadata: Record<string, unknown>, rawEvent: RawEvent) => {
        await projection.onCustomerRemoved(event, rawEvent.subject);
      }
    }
  ];
}
