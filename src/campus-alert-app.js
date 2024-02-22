import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class CampusAlert extends LitElement {

  static get tag() {
    return 'campus-alert-app';
  }

  constructor() {
    super();
    

  }

  static get styles() {
    return css`

        .container{
            height: 100px;
            width: 100%;

      
            background-color: grey
        }
        .alert-message-wrap{
          height: 90%;
          width: 90%;

          background-color: orange;
          transform: skew(20deg); 
        }

    
  `}

  






  render() {

    
    
    

    return html`
    
    
  <div class="container">
    <div class="date">
          <p>
            February 22, 2024
            12:00am
          </p>
    </div>
    <div class="alert-message-wrap">
      <div class="alert-message">
        <p>
          THIS IS THE ALERT!
        </p>
      </div>
    </div>
  </div>
    

      `;
    
  }

  static get properties() {
    return {
        
    };
  }

}
globalThis.customElements.define(CampusAlert.tag, CampusAlert);
