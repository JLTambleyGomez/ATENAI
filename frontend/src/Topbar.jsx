
import "./assets/css/Topbar.css"



const Topbar=()=>{


  const Lenguage="EN"

    
    return(
        <div className="MainContain">
        <div className="TopbarContain">
        
        <div className="Logo">
        <img className="a" src="https://res.cloudinary.com/ddectuilp/image/upload/v1712365005/ATENAI/logo_2_zibpls.png"></img>
        <h1 className="Name">TENAI</h1>
        </div>
        <div className="MainMenu">
        <p  className="p">{Lenguage === "EN" ? "Home" : "Inicio"}</p>
        <p  className="p">{Lenguage === "EN" ? "About Atenai" : "Sobre Atenai"}</p>
        <p  className="p">{Lenguage === "EN" ? "Discord" : "Discord"}</p>
        <p  className="p">{Lenguage === "EN" ? "Help" : "Help"}</p>

        </div>
        <div className="Menu">
        <button className="b1">{Lenguage === "EN" ? "My Studio" : "Mi Estudio "}</button>
        <button className="b1">{Lenguage === "EN" ? "Create Music" : "Crear Música"}</button>
        </div>
        </div>
        </div>
    )
}

export default Topbar