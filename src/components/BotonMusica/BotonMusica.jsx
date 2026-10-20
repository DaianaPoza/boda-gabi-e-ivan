import { useEffect, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import './BotonMusica.css'

export default function BotonMusica({ audioRef }) {
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const alSonar = () => setSonando(true)
    const alPausar = () => setSonando(false)

    audio.addEventListener('play', alSonar)
    audio.addEventListener('pause', alPausar)
    setSonando(!audio.paused)

    return () => {
      audio.removeEventListener('play', alSonar)
      audio.removeEventListener('pause', alPausar)
    }
  }, [audioRef])

  const alternar = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <button
      type="button"
      className={`musica ${sonando ? 'musica--sonando' : ''}`}
      onClick={alternar}
      aria-label={sonando ? 'Pausar música' : 'Reproducir música'}
    >
      {sonando ? <FiPause /> : <FiPlay className="musica__play" />}
    </button>
  )
}