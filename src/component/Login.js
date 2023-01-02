import '../assets/scss/components/Login.scss';

export default function Login (props) {

    const handleClickOnSignIn = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/facebook`, "_self");
    }
    return (
        <main id="login">
            <button onClick={handleClickOnSignIn} className="cta">Se connecter</button>
        </main>
    )
}