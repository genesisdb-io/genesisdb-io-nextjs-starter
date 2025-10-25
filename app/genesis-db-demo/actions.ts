"use server"

import { commandRouter } from "@/lib/cqrs-config"
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
  RemoveCustomerCommand
} from "@/lib/commands/customer-command-types"

export async function createCustomer(data: {
  firstName: string
  lastName: string
  emailAddress: string
}) {
  const command = new CreateCustomerCommand(
    data.firstName,
    data.lastName,
    data.emailAddress
  )
  await commandRouter.send(command)
}

export async function updateCustomer(data: {
  customerId: string
  firstName: string
  lastName: string
  emailAddress: string
}) {
  const command = new UpdateCustomerCommand(
    data.customerId,
    data.firstName,
    data.lastName,
    data.emailAddress
  )
  await commandRouter.send(command)
}

export async function removeCustomer(data: {
  customerId: string
}) {
  const command = new RemoveCustomerCommand(data.customerId)
  await commandRouter.send(command)
}
