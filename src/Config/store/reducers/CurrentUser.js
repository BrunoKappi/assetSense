import { env } from '../../env';

// DEFAULT USER 
export const DefaultUser =
{
    PhotoUrl: '',
    LastEditedAt: '',
    CreatedBy: '',
    CreatedAt: '',
    LastLoginAt: 0,
    docID: '',
    id: '',
    Barcode: '',
    SecondaryPhone: '',
    Address: '',
    UserDocumentNumber: '',
    Preference: {
        Theme: '',
        Language: '',
        FontFamily: ''
    },
    DateOfBirth: 0,
    AccessToken: '',
    Name: '',
    LastName: '',
    Email: '',
    DateJoinedCompany: 0,
    Type: {
        docID: '', id: ''
    },
    Sector: {
        docID: '', id: ''
    },
    Deleted: false,
    Wage: 0,
    SocialMedia: {
        Facebook: '',
        Instagram: '',
        Twitter: '',
        LinkedIn: '',
        TikTok: '',
        GitHub: ''
    },
    CustomFieldsValues: [],
    PhotoUrl: '',
    uid: '',
    Deleted: false,
    docID: '',
    Country: {},
    Estate: {},
    City: {},
    Phone: '',
    QtdAssets: 0,
    Status: {
        id: ''
    },
    Tenant: {
        id: env.VITE_REACT_TENANT_ID,
        Name: env.VITE_REACT_TENANT_NAME
    }
}



const CurrentUser = (state = DefaultUser, action) => {

    switch (action.type) {
        case 'SET_CURRENT_USER':
            return action.CurrentUser
        default:
            return state
    }
} 

export default CurrentUser
