"use server"

import { z } from "zod"
import { registerCommand } from "genesisdb-cqrs"
import { v4 as uuidv4 } from 'uuid';
import { transmitEvents } from "@/app/actions";

// Customer creation schema
const CreateCustomerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
})

type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>

// Customer update schema
const UpdateCustomerSchema = z.object({
  customerId: z.string(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
})

type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>

// Customer removal schema
const RemoveCustomerSchema = z.object({
  customerId: z.string(),
})

type RemoveCustomerInput = z.infer<typeof RemoveCustomerSchema>

// Register create customer command
try {
  registerCommand("create-customer", async (data: CreateCustomerInput) => {
    const validated = CreateCustomerSchema.parse(data)
    const customerId = uuidv4()

    await transmitEvents([
      {
        source: 'tag:demo.genesisdb.io',
        subject: `/customer/${customerId}`,
        type: 'io.genesisdb.demo.customer-recorded',
        data: {
          firstName: validated.firstName,
          lastName: validated.lastName,
          email: validated.email,
        }
      }
    ])

    console.log("CreateCustomerCommand received:", validated)
  })
} catch {
  console.log("create-customer command already registered")
}

// Register update customer command
try {
  registerCommand("update-customer", async (data: UpdateCustomerInput) => {
    const validated = UpdateCustomerSchema.parse(data)

    // Only include fields that are actually provided
    const updateData: { firstName?: string; lastName?: string; email?: string } = {}
    if (validated.firstName !== undefined) updateData.firstName = validated.firstName
    if (validated.lastName !== undefined) updateData.lastName = validated.lastName
    if (validated.email !== undefined) updateData.email = validated.email

    await transmitEvents([
      {
        source: 'tag:demo.genesisdb.io',
        subject: validated.customerId,
        type: 'io.genesisdb.demo.customer-data-changed',
        data: updateData
      }
    ])

    console.log("UpdateCustomerCommand received:", validated)
  })
} catch {
  console.log("update-customer command already registered")
}

// Register remove customer command
try {
  registerCommand("remove-customer", async (data: RemoveCustomerInput) => {
    const validated = RemoveCustomerSchema.parse(data)

    await transmitEvents([
      {
        source: 'tag:demo.genesisdb.io',
        subject: validated.customerId,
        type: 'io.genesisdb.demo.customer-removed',
        data: {}
      }
    ])

    console.log("RemoveCustomerCommand received:", validated)
  })
} catch {
  console.log("remove-customer command already registered")
}
