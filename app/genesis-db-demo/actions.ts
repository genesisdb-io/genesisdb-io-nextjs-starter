"use server"

import { dispatchCommand } from "genesisdb-cqrs"
import "@/lib/commands/customer-commands"

export async function createCustomer(data: {
  firstName: string
  lastName: string
  email: string
}) {
  await dispatchCommand({
    type: "create-customer",
    data
  })
}

export async function updateCustomer(data: {
  customerId: string
  firstName: string
  lastName: string
  email: string
}) {
  await dispatchCommand({
    type: "update-customer",
    data
  })
}

export async function removeCustomer(data: {
  customerId: string
}) {
  await dispatchCommand({
    type: "remove-customer",
    data
  })
}
