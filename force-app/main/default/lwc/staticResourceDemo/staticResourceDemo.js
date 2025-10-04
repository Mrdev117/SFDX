import { LightningElement , wire} from 'lwc';
import LOGO from '@salesforce/resourceUrl/ferari';
import Content_asset from '@salesforce/contentAssetUrl/My_Asset_Logo';
import getProfiles from '@salesforce/apex/LwcController.getProfiles';
import Restricted_profile from '@salesforce/label/c.restricted_profile';
export default class StaticResourceDemo extends LightningElement {
    mylogo = LOGO;

    myAssetLogo = Content_asset;

    showbutton;
    @wire(getProfiles)
    wireprofile({data, error}){
        if(data)
        {
            console.log('profiles:', Restricted_profile);

            const pro = Restricted_profile.split(',').map(profile => profile.trim());
            console.log('pro', pro);

            console.log('data is', data);
            if(data === Restricted_profile){
                this.showbutton = false;
            }
            else{
                this.showbutton = true;
            }
        }else if(error){
            console.log('error is', error);
        }
    }
}