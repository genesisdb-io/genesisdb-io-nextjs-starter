"use server"

import { Client } from 'genesisdb'

export async function transmitEvents(events: { source: string | unknown, subject: string, type: string, data: unknown }[]) {
  const eventsToCommit = []

  for (const event of events) {
    if (!event.source || typeof event.source !== 'string') {
      if (!process.env.GENESISDB_SOURCE) {
        throw new Error('Event source is required. Either provide event.source or set GENESISDB_SOURCE environment variable.')
      }
    }

    const source = !event.source || typeof event.source !== 'string' ? process.env.GENESISDB_SOURCE as string : event.source

    eventsToCommit.push({
      source: source,
      subject: event.subject,
      type: event.type,
      data: event.data
    })
  }

  console.log('eventsToCommit', eventsToCommit)

  if (eventsToCommit.length > 0) {
    const client = new Client()
    await client.commitEvents(eventsToCommit)
  }
}
