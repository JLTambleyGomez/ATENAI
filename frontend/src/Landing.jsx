import ImageUploader from "./AddFile"
import "./assets/css/Landing.css";

const Landing = ({walletAddress}) => {
  return (
    <div className="LandinContain">
      <div className="firstContain">
        <div className="section1">
        <h1 className="title">Create Amazing Music with AI on the Web3</h1>


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


    <div>




    </div>

      <div className="secondcontain"> 
      <div className="section2-1">
<img className="img" src="https://res.cloudinary.com/ddectuilp/image/upload/v1713294034/ATENAI/_c8825c24-e074-49ab-a8f5-4f84ae1200d3_o5svcy.jpg"></img>

    <div className="section2-2">
<h1 className="h1s2">Upload your file to tokenize your music</h1>
      <ImageUploader walletAddress={walletAddress}/>

</div>
      </div>

     
 






      </div>












    </div>
  );
};

export default Landing;
