import type { EmailAdapter } from 'payload'
import { Resend } from 'resend'

/**
 * Minimal Payload email adapter over the Resend SDK the contact form already
 * uses — powers CMS password resets. Without RESEND_API_KEY, Payload falls back
 * to logging emails to the console (fine for local development).
 */
export function resendAdapter(apiKey: string, from: string): EmailAdapter {
  const match = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  const defaultFromName = match?.[1] || 'Uniix Studio'
  const defaultFromAddress = match?.[2] || from

  return () => {
    const resend = new Resend(apiKey)
    return {
      name: 'resend',
      defaultFromName,
      defaultFromAddress,
      async sendEmail(message) {
        const to = Array.isArray(message.to) ? message.to : [message.to]
        const { data, error } = await resend.emails.send({
          from: typeof message.from === 'string' ? message.from : `${defaultFromName} <${defaultFromAddress}>`,
          to: to.filter((x: unknown): x is string => typeof x === 'string'),
          subject: message.subject ?? '',
          html: typeof message.html === 'string' ? message.html : undefined,
          text: typeof message.text === 'string' ? message.text : '',
        })
        if (error) throw new Error(`Resend: ${error.message}`)
        return data
      },
    }
  }
}
