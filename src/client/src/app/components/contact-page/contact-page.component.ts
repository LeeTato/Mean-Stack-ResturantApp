import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  loading = false;
  buttonText = "Submit";

  emailFormControl = new FormControl('',Validators.compose([Validators.email,Validators.required]))
  nameFormControl = new FormControl("", Validators.compose([Validators.required]));
  subjectFormControl=new FormControl("",[ Validators.required]);
  textareaFormControl=new FormControl("",[ Validators.required]);



  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // get email(){
  //   return this.emailFormControl.get('email')
  // }
  register() {
    this.loading = true;
    this.buttonText = "Submitting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      subject: this.subjectFormControl.value,
      textarea: this.textareaFormControl.value

    }

    this.userService.sendEmail(user).subscribe(
      data => {
        let res:any = data;
        console.log (`${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
        this.nameFormControl.reset();
        this.emailFormControl.reset();
        this.subjectFormControl.reset();
        this.textareaFormControl.reset();
      }
    );
  }

}

