import { defineStore } from 'pinia'

export const fontSizes = ['small', 'medium', 'large', 'x-large'] as const
export type FontSize = (typeof fontSizes)[number]

/** x1000 so there's no floating point inaccuracy */
export const fontScales = [875, 1000, 1125, 1250] as const
export type FontScale = (typeof fontScales)[number]

export const lineHeight = ['compact', 'normal', 'relaxed', 'loose'] as const
export type LineHeight = (typeof lineHeight)[number]

export const tooltipDuraion = ['short', 'normal', 'long', 'persistent'] as const
export type TooltipDuration = (typeof tooltipDuraion)[number]

export const colorBlindModes = [
  'none',
  'protanopia',
  'deuteranopia',
  'tritanopia',
  'monochrome',
] as const
export type ColorBlindMode = (typeof colorBlindModes)[number]

interface A11Y {
  fontSize: FontSize
  fontScale: FontScale
  lineHeight: LineHeight
  reduceMotion: boolean
  disableAnimations: boolean
  tooltipDuration: TooltipDuration
  announcements: boolean
}

const defaultA11Y: A11Y = {
  // Visual settings
  fontSize: 'medium',
  fontScale: 1000,
  lineHeight: 'normal',

  // Motion & Animation
  reduceMotion: false,
  disableAnimations: false,

  // Interaction
  tooltipDuration: 'normal',
  announcements: true,
}

export const useA11yStore = defineStore('a11y', {
  state: (): A11Y => defaultA11Y,
  storage: 'localStorage',
})
