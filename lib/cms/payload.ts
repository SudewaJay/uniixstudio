import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

/** Payload Local API — direct DB access, no HTTP hop. getPayload memoises. */
export const getPayloadClient = () => getPayload({ config })
