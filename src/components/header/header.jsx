import { useTranslation } from 'react-i18next';
import Logo from '@assets/distro_logo.svg';
import './header.scss'

export function Header() {
  const {t} = useTranslation();
  
  return (
    <div className='header'>
      <img src={Logo} alt='logo' className='header__logo' />
      <h1 className='header__title'>{t('header.title')}</h1>
    </div>
  );
}