import { CommandHandling, CommandEventPublisher, SourcingMode } from "cqrskit"
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
  RemoveCustomerCommand
} from "./customer-command-types"
import {
  CustomerRecordedEvent,
  CustomerDataChangedEvent,
  CustomerRemovedEvent
} from "../events/customer-events"

export class CustomerHandlers {
  @CommandHandling({ sourcingMode: SourcingMode.NONE })
  async handleCreateCustomer(
    command: CreateCustomerCommand,
    publisher: CommandEventPublisher<null>
  ): Promise<string> {
    publisher.publish(
      new CustomerRecordedEvent(
        command.firstName,
        command.lastName,
        command.emailAddress
      )
    )

    console.log("CreateCustomerCommand received:", command)
    return command.customerId
  }

  @CommandHandling({ sourcingMode: SourcingMode.NONE })
  async handleUpdateCustomer(
    command: UpdateCustomerCommand,
    publisher: CommandEventPublisher<null>
  ): Promise<void> {
    publisher.publish(
      new CustomerDataChangedEvent(
        command.firstName,
        command.lastName,
        command.emailAddress
      )
    )

    console.log("UpdateCustomerCommand received:", command)
  }

  @CommandHandling({ sourcingMode: SourcingMode.NONE })
  async handleRemoveCustomer(
    command: RemoveCustomerCommand,
    publisher: CommandEventPublisher<null>
  ): Promise<void> {
    publisher.publish(new CustomerRemovedEvent())

    console.log("RemoveCustomerCommand received:", command)
  }
}
