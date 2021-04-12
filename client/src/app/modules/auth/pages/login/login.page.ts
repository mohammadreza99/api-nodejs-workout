import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageCheckerComponent } from '@shared/components/language-checker/language-checker.component';
import { AuthService } from '@core/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage extends LanguageCheckerComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(null)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      }).subscribe((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
