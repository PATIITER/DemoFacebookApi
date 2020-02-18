import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  userData: any;
  constructor(private activatedRoute: ActivatedRoute,
    private facebook: Facebook) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      });
    });
  }
}
