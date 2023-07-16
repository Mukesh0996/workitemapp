import HeaderStyles from './Header.module.css';

const Header = () => {

    return  <header className={HeaderStyles.header}>
                <h1>Todos App</h1>
                <small className={HeaderStyles.tagLine}>Centralized platform for managing your daily tasks and work items.</small>
            </header>
};

export default Header;