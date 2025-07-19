import { CloudEvent } from 'cloudevents';
import { Customer } from '@/lib/interfaces';

export class CustomerProjection {
  private customers: Map<string, Customer> = new Map();

  project(customerEvents: CloudEvent<unknown>[]): Customer[] {

    for (const event of customerEvents) {
      if (!event.subject) continue;

      console.log('Processing customer event:', {
        source: event.source,
        type: event.type,
        subject: event.subject,
        data: event.data
      });

      switch (event.type) {
        case 'io.genesisdb.demo.customer-recorded': {
          const customerData = event.data as {
            firstName: string;
            lastName: string;
            email: string;
          };

          this.customers.set(event.subject, {
            id: event.subject,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
          });
          break;
        }

        case 'io.genesisdb.demo.customer-data-changed': {
          const customerData = event.data as {
            firstName?: string;
            lastName?: string;
            email?: string;
          };

          const existingCustomer = this.customers.get(event.subject);
          if (existingCustomer) {
            this.customers.set(event.subject, {
              ...existingCustomer,
              firstName: customerData.firstName ?? existingCustomer.firstName,
              lastName: customerData.lastName ?? existingCustomer.lastName,
              email: customerData.email ?? existingCustomer.email,
            });
          }
          break;
        }

        case 'io.genesisdb.demo.customer-removed': {
          this.customers.delete(event.subject);
          break;
        }
      }
    }

    return Array.from(this.customers.values());
  }
}
