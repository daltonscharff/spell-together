'use client'

import { useParams } from "next/navigation"

export default function Room() {
  const {shortcode} = useParams<{shortcode: string}>();

  return (
    <div>Hello from ROOM: {shortcode}</div>
  )
}