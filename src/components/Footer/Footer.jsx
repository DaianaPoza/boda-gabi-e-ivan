import useReveal from '../../hooks/useReveal'
import './Footer.css'

export default function Footer() {
  const ref = useReveal()

  return (
    <footer ref={ref} className="seccion footer">
      <p className="texto footer__texto aparecer delay-1">
        ¡¡Gracias por acompañarnos!!
      </p>

      <p className="subtitulo footer__pronto aparecer delay-2">
        ¡Nos vemos pronto!
      </p>

      <div className="aparecer delay-3">
  <div className="footer__firma">
    <span className="footer__cinta" aria-hidden="true" />

    <p className="nombres footer__nombres">
      <span className="footer__nombres-texto">Gabi e Iván</span>
    </p>

    <p className="texto footer__fecha">05 · 12 · 2026</p>
  </div>
</div>

      
    </footer>
  )
}