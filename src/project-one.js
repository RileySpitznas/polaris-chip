import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class ProjectOne extends DDD {

  static get tag() {
    return 'project-one';
  }

  constructor() {
    super();
    this.opened = true;
    this.party = [];
    this.personName = "";
  }

  static get properties() {
    return {
    personName:{type: String, reflect: true},
    opened: {type: Boolean, reflect:true},
    party: {type: Array},
    };
  }

  static get styles() {
    return [
      super.styles,
      css`

      .container{
          display: inline-flex;
          flex-direction: row;
        }

      :host {
         display: block;
         margin: 10px;
            
        }

      .mainBody {
         /* height: 300px;
          width: 300px;
          max-width: 400px;
          max-height: 400px;
          display: flex;
          flex-direction: column;
          background-color: var(--ddd-theme-default-beaverBlue);
          border: var(--ddd-border-lg);
          color: var(--ddd-theme-default-keystoneYellow);
          z-index:1; */
          max-width: 680px;
          min-width: 250px;
          height: 250px;
          background-color:var(--ddd-theme-default-beaverBlue);
          z-index:1;
          align-items: center;
          
        }

      .openPop {
          width: 30%;
        }

      .popUp {
          display: flex;
          flex-direction: column;
          background-color: var(--ddd-theme-default-potential0);
          border: var(--ddd-border-lg);
          color: var(--ddd-theme-default-keystoneYellow);
          position: relative;
          right:200px; 
          transition: right 0.8s ease;
          opacity: 0;
          z-index:0;
        }

      .sidebar{
          max-width: 400px;
          max-height: 400px;
          height: 200px;
          width: 200px;
        }

      #rpg{
          display: inline-flex;
          margin: var(--ddd-spacing-3)
        }

      #nameInput{
          width:50%;
          margin-top:16px;
          display: inline-flex;
          margin: var(--ddd-spacing-1)
        }
      
      .header{
        background-color:var(--ddd-theme-default-keystoneYellow);
        color: blue;
        font: var(Roboto (ddd-font-primary) [--ddd-font-primary]);
        }

      .rpgAdd{
        width: 100px;
        display: inline-flex;
        margin: var(--ddd-spacing-6);
            
        }

      .headers{
        margin:10px;
        }
        .spacer{
          height:75px;
        }

      :host([opened]) .popUp{
          right:0;
          opacity: 1;
        }

      .rpgcharecter{
          display:flex;
          
        }

        .verticalStyle{
          display: flex;
          flex-direction: column; 
        }
      

        .searchChar{
          max-width: 100px;
          max-height: 200px;
          padding: 15px;
          /* margin: 58px; */
          
        }

     .partyCont{
        /*display:flex;
        flex-direction:row; */
        display:flex;
        flex-direction:row;
        margin-right: 60px;
        height: 150px;
        min-width: 100px;
        max-width: 650px;
        margin-bottom: 8px;
      }

     .buttonCont{
            width:100%;
            display:flex;
            flex-direction:row;
        }
      .saveButton{
            width: 30%;
        }
      #big-break{
          width:10%;
        } 
        #small-break{
           width:20%;
        }

                    //Tooltip stuff
        .tooltip {
        position: relative;
        display: inline-block; 
        cursor: pointer; 
        margin-bottom:8px;
      }
      .tooltip .tooltiptext {
        visibility: hidden;
        width: 60px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 10px 0;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: 25px;
        opacity: 0;
        transition: opacity 0.3s;
        font-size:12px;
     }
      .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
      }
                  //end of tooltip stuff 

    `];
  }

  addToParty() {
      const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
      const member = 
        {
          name: this.personName,
          id: randomNumber,
        }
        this.party.push(member);
        this.requestUpdate();

        this.shadowRoot.querySelector("#nameInput").value = "";
        this.shadowRoot.querySelector("#nameInput").focus();
  }

  targetClicked(e) {
    let value = e.target.id;

    for(let i = 0; i < this.party.length; i++){

        if(this.party[i].id == e.target.id){
          this.party.splice(i, 1);
          this.requestUpdate();
          break;
        }
    }
  }
  handleInput(event)
      {
        var userInput = event.target.value;
        userInput = userInput.slice(0,7);

        const invalidChar = userInput.match(/[^a-z0-9]/g)
        console.log(userInput.length)
        if(invalidChar)
        {
          alert(`The character '${invalidChar[0]}' is not allowed`);
          userInput = userInput.replace(invalidChar[0], '');

        }

        event.target.value = userInput;

      }

  openClick(){
    this.opened = !this.opened;
  }

  updateName(event){
    this.personName = event.target.value;
  }


//Confetti 
  makeItRain() {
   
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        
        setTimeout(() => {
          
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  main()
  {
    return html`

<div class ="container">
    
    <div class="mainBody">
      <confetti-container id="confetti">
        <div class="header">
         Add Users
        </div>
          <div class="partyCont" data-tooltip = "Click to Delete">
            ${this.party.map((member) => html`
            <div class="tooltip">
          <div class="verticalStyle">
              <rpg-character id="${member.id}" @click="${this.targetClicked}" seed = "${member.name}" > </rpg-character>
              <span class="tooltiptext">Click to Delete</span>
              <div style= 'font-size:20px; text-align:center;' > ${member.name}</div>
              
          </div>
  </div>
          

            `)}
          </div>
          <div class="spacer"> </div>
      <div class="buttonCont">
        <div id="big-break"></div>
          <button class="openPop"  @click="${this.openClick}" > Add character</button>
            <div id="small-break"></div>
              <button class="saveButton" @click = "${this.makeItRain}"> Save </button>
        <div id="big-break"></div>
      </div>
        </confetti-container>
      </div>
    
    <div class="sidebar">
    
      <div class=popUp>
      
          <input id="nameInput" type="text" value=${this.personName} @input=${this.updateName} @keyup=${this.handleInput}>
          <rpg-character id="rpg" class="searchChar" seed= ${this.personName}> </rpg-character>
          
          <button class= "rpgAdd" @click="${this.addToParty}" ?disabled="${this.party.length >=5}"> Add to Party</button>
      </div>
    </div>     
  </div>
    `;
  }


   render() {     
    return this.main();
   }


}

globalThis.customElements.define(ProjectOne.tag, ProjectOne);