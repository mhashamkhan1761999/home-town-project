import { Outlet } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"


function App() {

  return (
    <>
      <Header />
      <main className="bg-[#100e08]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
