import { NgModule } from '@angular/core';
import { TemperaturePipe } from './temperature/temperature';
@NgModule({
	declarations: [TemperaturePipe],
	imports: [],
	exports: [TemperaturePipe]
})
export class PipesModule {}
