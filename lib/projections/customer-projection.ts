import { Customer } from '@/lib/interfaces';
import {
  CustomerRecordedEvent,
  CustomerDataChangedEvent,
  CustomerRemovedEvent
} from '@/lib/events/customer-events';

/**
 * In-memory customer list for read model
 * In a real application, this would be a database
 */
interface CustomerListEntry {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

/**
 * Projector that maintains a read model (list) of all customers
 */
export class CustomerProjection {
  private customers: Map<string, CustomerListEntry> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onCustomerRecorded(event: CustomerRecordedEvent | any, subject: string): Promise<void> {
    // Handle both old (nested payload) and new (flat) event formats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (event as any).payload || event;

    // Extract UUID from subject (e.g., "/customer/uuid" -> "uuid")
    const customerId = subject.split('/').pop() || subject;

    console.log(`[CustomerList] Customer recorded: ${data.firstName} ${data.lastName}`);
    this.customers.set(subject, {
      id: customerId, // Store just the UUID, not the full subject path
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress || data.email || '' // Support both old 'email' and new 'emailAddress'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onCustomerDataChanged(event: CustomerDataChangedEvent | any, subject: string): Promise<void> {
    const customer = this.customers.get(subject);
    if (!customer) {
      console.warn(`[CustomerList] Customer ${subject} not found`);
      return;
    }

    // Handle both old (nested payload) and new (flat) event formats
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (event as any).payload || event;

    console.log(`[CustomerList] Customer data changed: ${customer.firstName} ${customer.lastName}`);

    this.customers.set(subject, {
      ...customer,
      firstName: data.firstName ?? customer.firstName,
      lastName: data.lastName ?? customer.lastName,
      emailAddress: (data.emailAddress || data.email) ?? customer.emailAddress // Support both old 'email' and new 'emailAddress'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onCustomerRemoved(_event: CustomerRemovedEvent | any, subject: string): Promise<void> {
    const customer = this.customers.get(subject);
    if (!customer) {
      console.warn(`[CustomerList] Customer ${subject} not found`);
      return;
    }
    console.log(`[CustomerList] Customer removed: ${customer.firstName} ${customer.lastName}`);
    this.customers.delete(subject);
  }

  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }
}
