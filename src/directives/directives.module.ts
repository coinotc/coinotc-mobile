import { NgModule } from '@angular/core';
import { TextAvatarDirective } from './text-avatar/text-avatar';
import { ShowHideInput } from './ShowHideInput/show-hiden-input';

@NgModule({
	declarations: [TextAvatarDirective, ShowHideInput],
	imports: [],
	exports: [TextAvatarDirective, ShowHideInput]
})
export class DirectivesModule {}
