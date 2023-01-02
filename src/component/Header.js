import '../assets/scss/components/Header.scss';
import Notifications from './Notifications';

export default function Header(props) {

    const handleSelectPageChange = (event) => {
        changeSelectedPage(event.target.value);
    }

    const changeSelectedPage = (pageId, forceUpdate) => {
        props.onChangeSelectedPage(pageId, forceUpdate);
    }

    return (
        <header id="header">
            <div>{props.user.displayName}</div>
            <div className='select-ctn'>
                <select onChange={handleSelectPageChange}>
                    <option value="" key={0}>Sélectionner une page</option>
                    {props.pages && props.pages.map((page) => {
                        return <option value={page.id} key={page.id} selected={props.selectedPage && props.selectedPage.id === page.id}>{page.name}</option>
                    })}
                </select>
            </div>
            <Notifications onNotificationItemClick={(pageId) => changeSelectedPage(pageId, true)}/>
        </header>
    )
}