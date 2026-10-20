import { useRef, useState } from 'react'
import Portada from './components/Portada/Portada'
import FondoTarjeta from './components/FondoTarjeta/FondoTarjeta'
import LluviaMargaritas from './components/LluviaMargaritas/LluviaMargaritas'
import BotonMusica from './components/BotonMusica/BotonMusica'
import Header from './components/Header/Header'
import FechaHora from './components/FechaHora/FechaHora'
import CuentaRegresiva from './components/CuentaRegresiva/CuentaRegresiva'
import Lugar from './components/Lugar/Lugar'
import Regalos from './components/Regalos/Regalos'
import Playlist from './components/Playlist/Playlist'
import AlbumCompartido from './components/AlbumCompartido/AlbumCompartido'
import Confirmacion from './components/Confirmacion/Confirmacion'
import Footer from './components/Footer/Footer'
import musica from './assets/musica.mp3'

function App() {
  const [abierta, setAbierta] = useState(false)
  const audioRef = useRef(null)

  const handleEntrar = () => {
    setAbierta(true)
    audioRef.current?.play().catch(() => {})
  }

  return (
    <>
      <audio ref={audioRef} src={musica} loop preload="auto" />

      <Portada abierta={abierta} onEnter={handleEntrar} />

      {abierta && (
        <>
          <FondoTarjeta />
          <LluviaMargaritas />
          <BotonMusica audioRef={audioRef} />

          <main className="contenido">
            <Header />
            <FechaHora />
            <CuentaRegresiva />
            <Lugar />
            <Regalos />
            <Playlist />
            <AlbumCompartido />
            <Confirmacion />
            <Footer />
          </main>
        </>
      )}
    </>
  )
}

export default App