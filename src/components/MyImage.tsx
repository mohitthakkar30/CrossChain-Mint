import Image from "next/image";

const MyImage = (props:any) => {
    return (
      <div style={{ border: "5px solid black" , display: "flex", 
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5vh",
                    position: "relative"}}>
      <Image 
        src={props.imageUrl}
        alt="Picture of NFT"
        width="200"
        height="50"
        // layout="responsive"
      />
      </div>
      
    ) }
  
  export default MyImage;