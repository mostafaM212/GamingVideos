"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var InputComponent = /** @class */ (function () {
    function InputComponent() {
        this.label = '';
        this.inputType = 'text';
        this.placeholder = '';
        this.underText = 'this field is required';
        this.control = new forms_1.FormControl('');
    }
    InputComponent.prototype.ngOnInit = function () {
        console.log(this.control.touched, this.control.invalid);
    };
    __decorate([
        core_1.Input('label')
    ], InputComponent.prototype, "label");
    __decorate([
        core_1.Input('inputType')
    ], InputComponent.prototype, "inputType");
    __decorate([
        core_1.Input('placeholder')
    ], InputComponent.prototype, "placeholder");
    __decorate([
        core_1.Input('underText')
    ], InputComponent.prototype, "underText");
    __decorate([
        core_1.Input('control')
    ], InputComponent.prototype, "control");
    InputComponent = __decorate([
        core_1.Component({
            selector: 'app-input',
            templateUrl: './input.component.html',
            styleUrls: ['./input.component.css']
        })
    ], InputComponent);
    return InputComponent;
}());
exports.InputComponent = InputComponent;
