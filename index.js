"use strict";
const quoteText = document.querySelector(".quote__text");
const btn = document.querySelector(".btn__dice");
const advice_id = document.querySelector('.advice-number');
//////////

const displayQuote = function(id,advice){
  advice_id.innerText = `#${id}`;
  quoteText.innerText = `"${advice}"`;
}

//api fetch
const getQuote = async function () {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");

    if(!res.ok) throw new Error("Couldn't generate advice");

    const { slip } = await res.json();
    return slip;

  } catch (err) {
    console.error(err);
    throw err;
  }
};
//Render quote or error
const renderAdvice = async function(){
    try{
        const {id,advice} = await getQuote();
        displayQuote(id,advice);
    }
    catch(err){
        quoteText.innerText = `${err.msg}`;
    }
}
//for the first time
renderAdvice();

//Generate new advice after every clicks
btn.addEventListener('click',function(){
    renderAdvice();
})
