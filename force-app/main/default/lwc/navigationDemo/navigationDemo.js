import { LightningElement , wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationDemo extends NavigationMixin(LightningElement) {

    navigatehomehandler()
    {
     let pageref =   
       {
    type: 'standard__namedPage',
    attributes: {
        pageName: 'home'
    }
    }
        this[NavigationMixin.Navigate](pageref);
    }

    acclistview(){
        let pageacc = 
        {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            },
            state: {
                filterName: 'PlatinumandGoldSLACustomers'
        }
        }
        this[NavigationMixin.Navigate](pageacc);
    }
}