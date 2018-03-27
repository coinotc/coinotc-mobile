
# Font Awesome added to ionic usage
```html

Run "ionic cordova run browser" when you test on browser.
Moreover, you can run "ionic cordova run ios/android" to test on your simulator.

<!-- basic usage -->
<fa-icon name="camera-retro"></fa-icon>
<!-- basic usage with color -->
<fa-icon name="camera-retro" color="danger"></fa-icon>
<!-- larger icons -->
<fa-icon name="camera-retro" size="4x"></fa-icon>
<!-- fixed width icons -->
<fa-icon name="camera-retro" fixed-width></fa-icon>
<!-- dynamic value -->
<fa-icon [name]="icon"></fa-icon>
<!-- buttons -->
<button ion-button icon-left>
  <fa-icon name="group"></fa-icon>
  people
</button>
```