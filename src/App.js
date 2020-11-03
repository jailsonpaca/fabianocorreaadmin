import React from 'react';
import { Admin, Resource} from 'react-admin';
import CustomLoginPage from './components/CustomLoginPage';
import {dataProvider,authProvider} from './provider';
import {ListPost,CreatePost,EditPost} from './components/resources/Post';
import {ListPlanos,CreatePlanos,EditPlanos} from './components/resources/Planos';
import {ListDepoimentos,CreateDepoimentos,EditDepoimentos} from './components/resources/Depoimentos';
import {ListLandings,CreateLandings,EditLandings} from './components/resources/Landings';
import PlanosIcon from '@material-ui/icons/AttachMoney';
import DepoimentosIcon from '@material-ui/icons/ThumbUp';
import LandingIcon from '@material-ui/icons/MenuBook';
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import './index.css';

const i18nProvider = polyglotI18nProvider(() => ptBrMessages, 'pt-br');

const App = () => (
      <Admin dataProvider={dataProvider}
             loginPage={CustomLoginPage}
             authProvider={authProvider}
             i18nProvider={i18nProvider}>
         <Resource name="plans" options={{ label: 'Planos' }} list={ListPlanos} edit={EditPlanos} create={CreatePlanos} icon={PlanosIcon}/>
         <Resource name="depoiments" options={{ label: 'Depoimentos' }} list={ListDepoimentos} edit={EditDepoimentos} create={CreateDepoimentos} icon={DepoimentosIcon}/>
         <Resource name="posts" options={{ label: 'Posts' }}   list={ListPost} edit={EditPost} create={CreatePost} />
         <Resource name="landings" options={{ label: 'Landing Pages' }} list={ListLandings} edit={EditLandings} create={CreateLandings} icon={LandingIcon}/>
      </Admin>
  );

export default App;