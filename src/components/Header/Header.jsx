import useReveal from '../../hooks/useReveal'
import './Header.css'

export default function Header() {
  const ref = useReveal()

  return (
    <header ref={ref} className="seccion header">
      <h1 className="nombres aparecer delay-2">
        <span className="header__nombres">Gaby e Iván</span>
      </h1>

     <p className="subtitulo header__casamos aparecer delay-3">
  <span className="header__frase">
    ¡Nos casamos!
    <svg
      className="header__subrayado"
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M5 14 C 50 4, 110 20, 195 7" />
    </svg>
  </span>
</p>

      <div className="header__deslizar aparecer delay-4">
  <span className="header__deslizar-texto">Deslizá para ver más</span>
  <span className="header__chevron" aria-hidden="true" />
</div>
    </header>
  )
}