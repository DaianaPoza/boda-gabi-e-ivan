import { useEffect, useRef } from 'react'

export default function useReveal(threshold = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          elemento.classList.add('reveal--visible')
          observer.unobserve(elemento)
        }
      },
      { threshold }
    )

    observer.observe(elemento)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}