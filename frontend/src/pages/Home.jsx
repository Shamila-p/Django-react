// import React, {useEffect, useState} from 'react'
// import Navbar from '../components/Navbar/Navbar'
// import { useSelector } from "react-redux";
// import "./home.css"


// function Home() {
    
// const username = useSelector((state) => state.username);
// const [loopNum, setLoopNum] = useState(0);
// const [isDeleting, setIsDeleting] = useState(false);
// const [text, setText] = useState('');
// const [delta, setDelta] = useState(200 - Math.random() * 100);
// const [index, setIndex] = useState(1);
// const toRotate = [ `${username}!` ];
// const period = 1000;

// useEffect(() => {
//   let ticker = setInterval(() => {
//     tick();
//   }, delta);

//   return () => { clearInterval(ticker) };
// })

// const tick = () => {
//   let i = loopNum % toRotate.length;
//   let fullText = toRotate[i];
//   let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

//   setText(updatedText);

//   if (isDeleting) {
//     setDelta(prevDelta => prevDelta / 2);
//   }

//   if (!isDeleting && updatedText === fullText) {
//     setIsDeleting(true);
//     setIndex(prevIndex => prevIndex - 1);
//     setDelta(period);
//   } else if (isDeleting && updatedText === '') {
//     setIsDeleting(false);
//     setLoopNum(loopNum + 1);
//     setIndex(1);
//     setDelta(500);
//   } else {
//     setIndex(prevIndex => prevIndex + 1);
//   }
// }

//   return (
//     <>
//       <Navbar/>
//       <div className="home-body">
//       {/* <h1 className='heading'>Welcome {username}!</h1> */}
//       <h1 className='heading'>{`Welcome, `}<span className="heading" dataPeriod="100"><span className="heading">{text}</span></span></h1>
//       </div>
//     </>
//   )
// }

// export default Home

import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useSelector } from "react-redux";
import "./home.css"

function Home() {
  const username = useSelector((state) => state.username);

  return (
    <>
      <Navbar/>
      <div className="home-body">
        <h1 className='heading'>Welcome, {username}!</h1>
      </div>
    </>
  )
}

export default Home
