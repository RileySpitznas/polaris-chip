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

        #confetti{
            height:100%;
            width:100%;
        }
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

        .plus:focus, 
        .plus:hover{
            background-color: lightblue;
        }

        .minus:focus, 
        .minus:hover{
            background-color: lightblue;
        }

    
  `}

  plusClick() {
    this.nums++;

  }
  minusClick() {
    this.nums--;
  }


updated(changedProperties) {
    if (changedProperties.has('nums') && this.nums == 21) {
      this.makeItRain();
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }



  render() {

    var container = "";
    if (this.nums == 18) {
        container = 'red';
    } else if (this.nums == 21) {
        container = 'orange';
    } else if (this.nums == this.max) {
        container = 'green';
    } else if (this.nums == this.min) {
        container = 'yellow';
    } else {
        container = 'purple'; 
    }

    return html`
    
    
        <div class="container">
        <confetti-container id="confetti">  
            <div class="text-area" style = "color:${container}">
                
                <div>${this.nums}</div>
                
            </div>
            <div class="button-area">
                <button class = "plus" @click = ${this.plusClick} ?disabled="${this.max === this.nums}" > + </button>
                <button class = "minus" @click = ${this.minusClick} ?disabled="${this.min === this.nums}"> - </button>
            </div>
            
            </confetti-container>
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
