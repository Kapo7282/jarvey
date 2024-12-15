export const ANIMATION_CLASSES = {
  fadeIn: 'animate__animated animate__fadeIn animate__faster',
  fadeInDown: 'animate__animated animate__fadeInDown',
  fadeInLeft: 'animate__animated animate__fadeInLeft',
  pulse: 'animate__animated animate__pulse animate__infinite',
  bounceIn: 'animate__animated animate__bounceIn',
} as const

export type AnimationClass = keyof typeof ANIMATION_CLASSES