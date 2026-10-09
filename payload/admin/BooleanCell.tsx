'use client'

import type { DefaultCellComponentProps } from 'payload'

/** Yes/no list cell: a readable badge instead of Payload's raw true/false. */
export function BooleanCell({ cellData }: DefaultCellComponentProps) {
  return cellData ? (
    <span className="uniix-badge uniix-badge--yes">Yes</span>
  ) : (
    <span className="uniix-cell-muted" aria-label="No">
      —
    </span>
  )
}

export default BooleanCell
