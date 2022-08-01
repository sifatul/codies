import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import styles from '../../styles/Home.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                target='_blank'
                rel='noopener noreferrer'
            >
                Made with
                <span className={styles.logo}>
                    <FavoriteRoundedIcon style={{ color: 'red' }} />
                </span>
            </a>
        </footer>
    );
};
export default Footer;
