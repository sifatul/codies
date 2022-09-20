import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import styles from '../../styles/Home.module.css';

import Styled from '@emotion/styled';
const Footer = Styled.footer`
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
    justify-content: center;
    align-items: center;
    position:absolute;
    bottom:0;
    left:0;
    right:0
`

const FooterComponent = () => {
    return (
        <Footer >
            <a
                href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                target='_blank'
                rel='noopener noreferrer'
            >
                Made with
                <span className={styles.logo}>
                    <FavoriteRoundedIcon style={{ color: 'red' }} />
                </span>  Codies
            </a>
        </Footer>
    );
};
export default FooterComponent;
