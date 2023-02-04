"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
        var _this = this;
        this.name = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(2),
        ]);
        this.email = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email,
        ]);
        this.password = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(5),
        ]);
        this.confirmPassword = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(5),
        ]);
        this.age = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.min(3),
            forms_1.Validators.max(100),
        ]);
        this.phoneNumber = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(5),
        ]);
        this.RegisterForm = new forms_1.FormGroup({
            age: this.age,
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            phoneNumber: this.phoneNumber
        });
        this.onRegisterHandler = function () {
            console.log(_this.RegisterForm.controls);
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        console.log(this.RegisterForm);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
