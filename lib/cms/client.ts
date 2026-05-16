import { getPayload as getPayloadLocal } from 'payload'
import configPromise from '../../payload.config'

export const getPayload = async () => {
  return await getPayloadLocal({ config: configPromise })
}
