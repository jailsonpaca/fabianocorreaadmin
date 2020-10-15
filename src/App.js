import React from 'react';
import { Admin, Resource} from 'react-admin';
import {FirebaseAuthProvider,FirebaseDataProvider} from 'react-admin-firebase';
import CustomLoginPage from './components/CustomLoginPage';
import {ListPost,CreatePost,EditPost} from './components/Post';
import {ListPlanos,CreatePlanos,EditPlanos} from './components/Planos';
import {ListLandings,CreateLandings,EditLandings} from './components/Landings';
import PlanosIcon from '@material-ui/icons/AttachMoney';
import LandingIcon from '@material-ui/icons/MenuBook';
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import './index.css';



const config = {
  apiKey: "AIzaSyCIRPDLxH1rNPmlx1v9sjE3fj_tgWr0wPg",
    authDomain: "fabianocorreasite.firebaseapp.com",
    databaseURL: "https://fabianocorreasite.firebaseio.com",
    projectId: "fabianocorreasite",
    storageBucket: "fabianocorreasite.appspot.com",
    messagingSenderId: "1071618794884",
    appId: "1:1071618794884:web:0613f01ff7dce6ffe769d1",
    measurementId: "G-R0356LDYXJ"
};

const options = {
  logging: true,
};

const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);
const i18nProvider = polyglotI18nProvider(() => ptBrMessages, 'pt-br');

const App = () => (
      <Admin dataProvider={dataProvider}
             loginPage={CustomLoginPage}
             authProvider={authProvider}
             i18nProvider={i18nProvider}>
         <Resource name="plans" options={{ label: 'Planos' }} list={ListPlanos} edit={EditPlanos} create={CreatePlanos} icon={PlanosIcon}/>
         <Resource name="posts" options={{ label: 'Posts' }}   list={ListPost} edit={EditPost} create={CreatePost} />
         <Resource name="landings" options={{ label: 'Landing Pages' }} list={ListLandings} edit={EditLandings} create={CreateLandings} icon={LandingIcon}/>
      </Admin>
  );

export default App;