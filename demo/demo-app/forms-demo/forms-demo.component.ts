import { Component, OnInit, ApplicationRef } from "@angular/core";

@Component({
	selector: "forms-demo",
	template: `
	<h1>Forms demo</h1>

	<h2>Check box</h2>
	<p class="checkbox-group-label">Check box group label</p>
	<n-checkbox [(ngModel)]="firstCheckboxState">Check box ({{firstCheckboxState}})</n-checkbox>
	<n-checkbox disabled="true">Check box disabled</n-checkbox>

	<n-checkbox
		[(ngModel)]="secondCheckboxState"
		[indeterminate]="someSelected"
		(change)="onTristateChange()">Tri-state check box (State: {{secondCheckboxState}}, Indeterminate: {{someSelected}})
	</n-checkbox>

	<n-checkbox *ngFor="let one of manyCheckboxes"
		[(ngModel)]="one.checked"
		(change) = "multiCheckboxChanged()"
		class="indent">Check ({{one.checked}})
	</n-checkbox>

	<n-checkbox
		[(ngModel)]="thirdCheckboxState">Check box (State: {{thirdCheckboxState}})
	</n-checkbox>


	<h2>Select all</h2>
	<div class="select-clear-example">
		<p class="checkbox-group-label">Schedule on these days</p>
		<button *ngIf="!allSelected()" class="btn btn-link" (click)="selectAll(week)">Select all</button>
		<button *ngIf="allSelected()" class="btn btn-link" (click)="clearAll(week)">Clear all</button>
		<n-checkbox *ngFor="let day of week"
			[(ngModel)]="day.checked">{{day.day}}
		</n-checkbox>
	</div>

	<h2>Switch</h2>

	<n-switch [(ngModel)]="firstSwitchState">Switch ({{firstSwitchState}})</n-switch>
	<n-switch disabled="true">Switch disabled</n-switch>

	<h2>Radio</h2>

	<n-radio [(ngModel)]="firstRadioState">Radio ({{firstRadioState}})</n-radio>
	<n-radio disabled="true">Radio disabled</n-radio>

	<h3>Radio group</h3>
	<n-radio-group [(ngModel)]="radio">
		<n-radio *ngFor="let one of manyRadios" [value]="one"
			class="indent">Radio {{one}}
		</n-radio>
	</n-radio-group>

	Radio selected: {{radio}}


	<h2>Forms (Label)</h2>

	<n-label>
		<label for="textInput1">Field small</label>
		<input type="text" [(ngModel)]="textInput1" class="input-field size-sm" id="textInput1">
	</n-label>
	<p>Text: {{textInput1}}</p>

	<n-label>
		<label for="textInput2">Field</label>
		<input type="text" [(ngModel)]="textInput2" class="input-field" id="textInput2">
	</n-label>
	<p>Text: {{textInput2}}</p>

	<n-label>
		<label for="textInput3">Field large</label>
		<input type="text" [(ngModel)]="textInput3" class="input-field size-lg" id="textInput3">
	</n-label>
	<p>Text: {{textInput3}}</p>

	<n-label>
		<label for="textInput4" class="disabled">Field disabled</label>
		<input type="text" class="input-field" id="textInput4" disabled>
	</n-label>

	<n-label>
		<label for="textareaText1">Text area</label>
		<textarea [(ngModel)]="textareaText1" class="input-field" id="textareaText1"></textarea>
	</n-label>
	<p>Text: {{textareaText1}}</p>


	<n-label class="ng-invalid ng-touched" labelState="success">
		<label for="textInput5">Field with success</label>
		<input type="text" class="input-field input-field-success" id="textInput5">
	</n-label>

	<n-label class="ng-invalid ng-touched" labelState="warning">
		<label for="textInput6">Field with warning</label>
		<input type="text" class="input-field input-field-warning" id="textInput6">
	</n-label>

	<n-label class="ng-invalid ng-touched" labelState="error">
		<label for="textInput7">Field with error</label>
		<input type="text" class="input-field input-field-error" id="textInput7">
	</n-label>
	`,
	styleUrls: ["./forms-demo.component.scss"]
})
export class FormsDemo {
	firstCheckboxState = true;
	secondCheckboxState = false;
	someSelected = false;
	firstSwitchState = false;
	firstRadioState = false;

	manyCheckboxes = [{checked: false}, {checked: false}, {checked: false}, {checked: false}];
	manyRadios = ["one", "two", "three", "four", "five", "six"];
	week = [
		{checked: false, day: "Sunday"},
		{checked: false, day: "Monday"},
		{checked: false, day: "Tuesday"},
		{checked: false, day: "Wednseday"},
		{checked: false, day: "Thursday"},
		{checked: false, day: "Friday"},
		{checked: false, day: "Saturday"}];

	constructor(private applicationRef: ApplicationRef) {}

	onTristateChange(event) {
		this.applicationRef.tick();  // give app time to process the click if needed
		if (this.someSelected) {
			this.secondCheckboxState = false; // clear all boxes
		}
		this.someSelected = false;
		for (let i = 0; i < this.manyCheckboxes.length; i++) {
			let one = this.manyCheckboxes[i];
			one.checked = this.secondCheckboxState;
		}
	}

	multiCheckboxChanged() {
		let startValue = this.manyCheckboxes[0].checked;

		for (let i = 1; i < this.manyCheckboxes.length; i++) {
			let one = this.manyCheckboxes[i];

			if (one.checked !== startValue) {
				// set indeterminate
				this.secondCheckboxState = false;
				this.someSelected = true;
				return;
			}
		}

		this.someSelected = false;
		this.secondCheckboxState = startValue;
	}

	selectAll(list: any[]) {
		list.forEach(item => item.checked = true);
	}

	clearAll(list: any[]) {
		list.forEach(item => item.checked = false);
	}

	allSelected() {
		return this.week.every(item => item.checked);
	}
}