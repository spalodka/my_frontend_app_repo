import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../modules/shared/shared.module';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    // MatInputModule,
    // MatButtonModule,
    // MatFormFieldModule,
    ReactiveFormsModule,
    SharedModule
    // MatCardModule,
    // MatIconModule
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http: HttpClient) {}
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();

  hide = true;
  submit() {
    console.log('is login form valid', this.loginForm.value);
    if (this.loginForm.valid) {
      this.submitEM.emit(this.loginForm.value);

      this.http
        .post('http://localhost:8000/validateUserDetails', this.loginForm.value)
        .subscribe(data => {
          console.log('api response is :: ', data);
        });
    }
  }
}
