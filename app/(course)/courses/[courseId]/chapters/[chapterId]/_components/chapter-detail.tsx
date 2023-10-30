"use client"

import { Preview } from '@/components/preview'
import React from 'react'

export const ChapterDetail = ({chapter}: any) => {
  return (
    <>
        <Preview value={chapter.description!} />
    </>
  )
}
