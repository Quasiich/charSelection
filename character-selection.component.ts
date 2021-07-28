import {Component, HostListener, OnInit} from '@angular/core';
import {EventDelegationService} from '../event-delegation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss'],
})
export class CharacterSelectionComponent implements OnInit {
  /* Field Vars for saving users selected Char
     for later use on e.g. Preview or playWithChar()*/
  selectedChar: number;
  clickWasInside = false;
  changeColor: boolean;

  constructor(private eventDelegation: EventDelegationService, private router: Router) {
  }

  // <editor-fold desc="Getting Data from EventDelegation Service to persist / for Template logic">
  get allowedToCreate(): boolean {
    return this.eventDelegation.allowedToCreate;
  }

  get characters(): any {
    return this.eventDelegation.characters;
  }

  // </editor-fold>

  ngOnInit() {

  }

  setCharSelected(object: any) {
    if (this.selectedChar !== object.Id) {
      this.selectedChar = object.Id;
      this.eventDelegation.postToRessource('PreviewCharacter', {SelectedCharacter: this.selectedChar});
    }
    this.clickWasInside = true;
  }

  /* HostListener to track if User clicked outside of the CharCards
     The Listener will be automatically removed in rgOnDestroy Hook */
  @HostListener('document:click')
  unsetCharSelected() {
    if (!this.clickWasInside) {
      if (this.selectedChar != null) {
        this.eventDelegation.postToRessource('PreviewCharacter', {SelectedCharacter: 0});
        this.selectedChar = null;
      }
    }
    this.clickWasInside = false;
  }

  // Play with the Char whose Card is currently selected
  playWithThisChar() {
    this.eventDelegation.postToRessource('SelectCharacter', {SelectedCharacter: this.selectedChar});
    this.router.navigate(['hud']);
  }

}
