import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";

const Detail = (props) => {
  // extracts the id parameter from the URL using the useParams() hook from 'reac-router-dom'.
  const { id } = useParams();
  // declares a state variable called 'detailData' and a function 'setDetailData' to update the value
  // of 'detailData'. The initial value of the 'detailData' variable is an empty object. 
  const [detailData, setDetailData] = useState({});
  // this hook executes its callback when the components is mounted and every time the 'id' parameter changes. 
  useEffect(() => {
    console.log(detailData);
    // 'db' is an object from FireBase used to interact with data stored in FireBase. 
    // It has several methods such as: colletion() and doc(). colletion() takes the name
    // of the data set being queried as an argument. 
    db.collection("movies")
      // doc() selects the 'id' of a specific document being retrieved. 
      .doc(id)
      // this method gets the selected document. 
      .get()
      // if the code above executes properly, the callback inside 'then()' executes.
      .then((doc) => {
        // if a document was found, detailData is updated with the data of a different movie. 
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          // if there's no document, a message is logged to the console. 
          console.log("no such document in firebase 🔥");
        }
      })
      // if there was any error when executing the code to get the movie, the following message is 
      // logged to the console. 
      .catch((error) => {
        console.log("Error getting document:", error);
      });
      // the callback is executed everytime this dependecy changes. 
  }, [id]);

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  /*Positions element relative to its normal position but makes it occupy
    the same space as if it was not positioned.*/
  position: relative;
  /*Sets minimum height of element to height of viewport minus
    250px.*/
  min-height: calc(100vh-250px);
  /*Any content of the element that overflows the element horizontally 
    will be clipped*/
  overflow-x: hidden;
  /*Makes the element occuppy the full width available and will 
    create a new line after it.*/
  display: block;
  /*Positions the element 72 pixels away from the top edge of its containing element.*/
  top: 72px;
  /*gives a padding of 0 pixels to the top and bottom of the element and 
    3.5% of the viewport's width plus 5 pixels to the left and right.*/
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  /*puts if 0 pixels away form the left side of its containing element.*/
  left: 0px;
  /*element will be visible in an 80%*/
  opacity: 0.8;
  /*positions the element relative to the viewport.*/
  position: fixed;
  /*fixes the element in the top right corner of the viewport*/
  right: 0px;
  top: 0px;
  /*places the element behind all other content or elements in the page*/
  z-index: -1;
  /*This image will be used as the background and will be located behind all elements.
    It stretches across the whole viewport's width and height.*/
  img {
    width: 100vw;
    height: 100vh;
    /*when viewport is less than 768px in width, the elements width
      is taken to its default value.*/
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  /*aligns the items along the vertical axis to the end of the container.*/
  align-items: flex-end;
  display: flex;
  /*sets the horizontal alignment of flex items within the flex container to the start*/
  -webkit-box-pack: start;
  /*sets the horizontal alignment of flex items within the flex container to the start.*/
  justify-content: flex-start;
  /*Sets the margin to 0px for the top and bottom, and centers the container horizontally using auto margins.*/
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  /*the image will be 35% of the viewport as long as the width is 200px-600px*/
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  /*aligns the items along the vertical axis to the end of the container.*/
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;