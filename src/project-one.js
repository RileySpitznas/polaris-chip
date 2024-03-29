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
          height: 200px;
          width: 200px;
          max-width: 400px;
          max-height: 400px;
          display: flex;
          flex-direction: column;
          background-color: var(--ddd-theme-default-beaverBlue);
          border: var(--ddd-border-lg);
          color: var(--ddd-theme-default-keystoneYellow);
          z-index:1;
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
          right:200px; /* Initially hidden to the right */
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
        width: 50%;
        display: inline-flex;
        margin: var(--ddd-spacing-6);
            
        }

      .headers{
        margin:10px;
        }
      
      :host([opened]) .popUp{
          right:0;
          opacity: 1;
        }

      .rpgcharecter{
          display:flex;
          
        }

      rpg-character{
          max-width: 5vw;
          max-height: 5vh;
          padding: 28px;
          margin: 28px;
        }

     .partyCont{
        display:flex;
        flex-direction:row;
        
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
          <div class="partCont">
            ${this.party.map((member) => html`
      
              <rpg-character id="${member.id}" @click="${this.targetClicked}" seed = "${member.name}" > </rpg-character>
              <div style= 'font-size:16px; text-align:center;' > ${member.name}</div>
            `)}
          </div>
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
      
          <input id="nameInput" type="text" value=${this.personName} @input=${this.updateName}>
          <rpg-character id="rpg" seed= ${this.personName}> </rpg-character>
          
          <button class= "rpgAdd" @click="${this.addToParty}" > Add to Party</button>
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