'use client'

import type { DefaultCellComponentProps } from 'payload'

/** Enquiry status as a labelled, tinted badge (the text carries the meaning; colour only supports it). */
export function StatusCell({ cellData, field }: DefaultCellComponentProps) {
  if (!cellData || typeof cellData !== 'string') return <span className="uniix-cell-muted">—</span>
  const options = (field as { options?: { label: unknown; value: string }[] }).options ?? []
  const match = options.find((o) => o.value === cellData)
  const label = typeof match?.label === 'string' ? match.label : cellData
  return <span className={`uniix-badge uniix-badge--status-${cellData}`}>{label}</span>
}

export default StatusCell
