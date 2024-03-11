import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert-app';
  }

  constructor() {
    
    super();
    this.open = false;
    this.message = "";
    this.sticky = true;
    this.date = "Febuary 27th 2024";
    this.issueLevel="welcome"
    
  }


  static get styles() {
    return css`


      .open-toggle-button{
        display: flex;
        align-items:center;
        justify-content: center;

      }
      
        .opencontainer{
          display: flex;
          background-color: orange; 
        }
        
        .alert-container{
          flex: 1;
          padding: 40px;
          background-color: yellow;
          transform: skew(20deg);

        }

        .sticky{
          position: sticky; 
          top: 0;
          z-index: 100;
          opacity: 1.0;

        }

        .alert-text{
          transform: skew(-20deg)

        }
        .button-container{
          flex: 1;
          padding: 40px;
          background-color: orange; 
        }
        .closedContainer{
          display: flex; 
          align-items: center;
          justify-content: center;
          background-color: orange;
          padding: 10px;

        }
        .close-toggle-button{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px; 

        }
        .date-container{
          flex: 1;
          padding: 40px;
          background-color: orange; 

        }

  `;
  }

toggleAlert()
{
this.open = !this.open;
}

openView(colorP, colorB){
    
  return html`

  
  <div class="opencontainer ${(this.sticky) ? "sticky" : ""}">
    <div class="date-container">
      <p>${this.date}</p>
    </div>
    <div class="alert-container">
      <!-- This needs to be skewed -->
      <p class="alert-text">${this.message}</p>
    </div>
    <div class="button-container">
      <div class="open-toggle-button" @click="${this.toggleAlert}">
        ${this.open ? 'close' : 'open'}
        <svg xmlns="http://www.w3.org/2000/svg" style=" height:35px; width:35px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
      </div>
    </div>


  </div>



    `;
  
}

closeView(colorP)
{
return html`

<div class="closedContainer${(this.sticky) ? "sticky" : ""}">
  <div class="close-toggle-button" @click="${this.toggleAlert}">
  <svg xmlns="http://www.w3.org/2000/svg" style=" height:50px; width:50px;" viewBox="0 0 24 24"><title>alert-circle-outline</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
    ${this.issuelevel}
    <svg xmlns="http://www.w3.org/2000/svg" style=" height:35px; width:35px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
    </div>

  </div>
</div>
`;
}


  render() {

      let colorP = "white";
      let colorB= "black"
      if(this.issueLevel === "notice"){colorP = "yellow", colorB = "orange"}
      if(this.issueLevel === "warning"){colorP = "red", colorB = "green"}
      if(this.issueLevel === "alert"){colorP = "purple", colorB = "pink"}
      if(this.issueLevel === "welcome"){colorP = "#cfeceb", colorB = "#fff"}

      if(this.issueLevel === "welcome") (this.message) = "Welcome to PSU alerts.";
      if(this.issueLevel === "notice") (this.message) = "Notice: Traffic on Pollock Road";
      if(this.issueLevel === "warning") (this.message) = "WARNING: Classes Canceled due to Weather"
      if(this.issueLevel === "alert") (this.message) = "URGENT WARNING: Dangerous Peron(s) Near HUB";


    return (this.open) ? this.openView(colorP,colorB) : this.closeView(colorP);

    

  }

  static get properties() {
    
      return {
        open: { type: Boolean, reflect: true },
        message:{type: String},
        issueLevel:{type: String, reflect: true},
        sticky:{type: Boolean},
        date: { type: String },
      };
    }
  }

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
