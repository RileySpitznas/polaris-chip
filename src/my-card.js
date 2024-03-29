import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "Default";
    this.image = "Default";
    this.para = "Default";
    this.button = "Default";
    this.fancy = false;

  }

  static get styles() {
    return css`
    
    :host([fancy]) {
      display: block;
      background-color: pink;
      border: 2px solid fuchsia;
      box-shadow: 10px 5px 5px red;
    }

    :host  {
      display: flex;

    }
  
      .card {
        background-color: orange;
        border-radius: 10px;
        width: 300px;
        height: 250px;
        padding: 16px;
        /* float: left; */
        margin-right: 10px;
        margin-bottom: 10px;
      }

.change-background{
  background-color: blue;
}
.heading{
  font-size: 40px;
  color: black;
  text-align: center;
}

.image {
  float: left; 
  margin: 8px 4px 4px 10px;
}
.para{
  padding: 4px; 
  font-size: 14px;
  width: 130px;
  float: right;
  margin: 20px 8px 4px 4px;
}
.btn{
  display: none;
}

@media (max-width: 800px) and (min-width: 500px){
  .btn {
    background-color: blue;
    color: black;
    font-size: 18px;
    margin: 4px 4px 4px 80px;
    padding: 16px;
    display: block;
  }
}

@media (max-width: 500px) {
  .para {
  font-size: 18px;
  }
  .image {
    height: 130px;
    width: 130px;
  }
  .heading {
    font-size: 50px;
  }
  .card {
    height: 350px;
  }
}

    
  `}

openChanged(e) {
  console.log(e.newState);
  if (e.newState === "open") {
    this.fancy = true;
  }
  else {
    this.fancy = false;
  }
}
  

  render() {
    return html`
      
      <div class="border">
      <div class="card">
        <div class="heading">${this.title}</div>
        
        <!-- <img src="${this.image}" class="image" width=120px height=120px> -->
        <meme-maker alt="Cat stalking a small toy" image-url="https://cdn2.thecatapi.com/images/9j5.jpg" top-text="I bring you" bottom-text="the death">
</meme-maker> <!--this part is for the meme thing - can be deleted if needed and replaced w the above comment-->
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>Description</summary>
            <div>
              <slot>${this.para}</slot>
            </div>
          </details>
      <a href="${this.link}">
        <button class="btn">${this.button}</button>

        </a>
      </div>
    </div>
      
      `;
    
  }

  static get properties() {
    return {
      title: { type: String },
      image: {type: String},
      link: {type: String},
      para: {type: String},
      button: {type: String},
      fancy: { type: Boolean, reflect: true }
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
