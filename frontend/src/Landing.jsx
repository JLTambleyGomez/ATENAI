import "./assets/css/Landing.css";

const Landing = () => {
  return (
    <div className="LandinContain">
      <div className="firstContain">
        <div className="section1">
          <h1>Crea Música Increíble Con IA en Web3</h1>
        </div>
        <div className="section2">
          <video className="video" autoPlay muted loop>
            <source
              src="https://res.cloudinary.com/ddectuilp/video/upload/v1712457437/ATENAI/202404062324_4_xvl4rz.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Landing;
