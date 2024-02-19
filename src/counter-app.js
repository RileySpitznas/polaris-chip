import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.nums;
    this.nums = 0; 
    this.min = 0; 
    this.max = 10; 

  }

  static get styles() {
    return css`
        .container{
            height: 500px;
            width: 500px;

            border-radius: 25px;
            background-color: grey
        }
 
        .text-area{
            width: 100%;
            height: 75%;

            font-size: 60px;
            display: flex;
            justify-content: center;
            align-items: center;


        }
        .button-area{
            width: 100%;
            height: 25%;
            display: flex; 

            display: flex;
            justify-content: center;
            align-items: center;
        }

        button{
            background-color: pink;
            font-size: 40px;
            padding: 30px;
            margin-right: 100px;
            margin-left: 100px;
            border-radius: 10px;

        }
    
  `}

  plusClick() {
    this.nums++;

  }
  minusClick() {
    this.nums--;
  }



  render() {
    return html`
    

        <div class="container">
            <div class="text-area">
                <div>${this.nums}</div>
                
            </div>
            <div class="button-area">
                <button class = "plus" @click = ${this.plusClick} ?disabled="${this.max === this.nums}" > + </button>
                <button class = "minus" @click = ${this.minusClick} ?disabled="${this.min === this.nums}"> - </button>
            </div>

        </div>


  
      
      `;
    
  }

  static get properties() {
    return {
        nums: { type: Number, Reflect: true},
        min: {type: Number},
        max: {type: Number},
    };
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
