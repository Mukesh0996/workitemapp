import { useState } from 'react';
import HeaderStyles from './Header.module.css';

const Header = () => {

    const [dated, setDate] = useState(null);

    setInterval(() => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let meri = "AM"

        if(hours >12) {
            hours = hours - 12;
            meri = "PM"
            if(hours<10) {
                hours = "0"+hours;
            }
        }
        if(minutes<10) {
            minutes = "0"+ minutes;
        }

        if(seconds < 10) {
            seconds = "0" + seconds;
        }

    setDate({hours, minutes, seconds, meri});
    // console.log(dated);
    }, 1000)

    return  <header className={HeaderStyles.header}>
                <h1>Todos App</h1>
                <small className={HeaderStyles.tagLine}>Centralized platform for managing your daily tasks and work items.</small>
                {!!dated && <small className={HeaderStyles.date}>{dated.hours}:{dated.minutes}:{dated.seconds} {dated.meri}</small>}
            </header>
};

export default Header;