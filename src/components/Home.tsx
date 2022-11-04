import React, { useState } from 'react'

import StarIcon from '@mui/icons-material/Star';
import NavBar from './NavBar';
import PalleteButton from './PalleteButton';
import Modal from './interface/Modal';


 

const Home = () => {
   //modal
   const [signIn, setSignIn] = useState(false);
   const registerSign = () => {
     setSignIn((current) => !current);
 
   };
 
  return (
    <>
   
            <main className="main">
            <div className="header">
                <NavBar />
                <span className="header__signIn" onClick={registerSign}>
                  Sign In
                </span>
                <PalleteButton />
                </div>   
              <div className="main-block">
                <h2 className="main-block__header">Get our most innovating product</h2>
              </div>
              <div className="main-block">
                <div className="button main-button">
                <a href="#newProduct"><button >Start Shopping</button></a>
                </div>
              
              </div>
            </main>
              
        
            <div
              style={{ display: signIn ? "block" : "none" }}
              className="header__modal" 
            >
              <Modal signIn={signIn} />
            </div>
           


            <div className="container">

            
            <section className="guarantee">
              <h2 className="section-header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Cumque asperiores ab fuga animi.
              </h2>
              <div className="guarantee-block">
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">01</div>
                  <div className="guarantee-element__reassurance">24/7 Customer Care</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">02</div>
                  <div className="guarantee-element__reassurance">Safe payment</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">03</div>
                  <div className="guarantee-element__reassurance">Money Back guarantee</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
              </div>
            </section>
            </div>
           <section className="images"> 
              <div className="images-block">
                <img src={require('./../img/img1.jpg')} alt="chair" /><img src={require('./../img/img2.jpg')} alt="chair" /><img src={require('./../img/img3.jpg')} alt="chair" />
              </div>
           </section>
           <div className="container">
            <section id='newProduct' className="newProducts">
              
              <div className="section-header">
                Newest Products
              </div>
              <div className="newProducts-block">
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./../img/new/new1.jpg')}  alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$235.45</span><span ><s>$300</s> </span></div>
                </div>
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./../img/new/new2.jpg')} alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$420</span><span><s>$500</s></span></div>
                </div>
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./../img/new/new3.jpg')} alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$300</span><span><s>$432</s></span></div>
                </div>
              </div>
              <div className="button newProducts-button">
                <button>Explore more</button>
              </div>
            </section>
            </div>
    </>
  )
}

export default Home