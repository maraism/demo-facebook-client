import NotificationIcon from "./NotificationIcon";
import '../assets/scss/components/NotificationAlert.scss';

export default function NotificationAlert(props) {
    
    return (
    <div className="notification-alert" onClick={props.onClick}>
        <NotificationIcon />
        {props.nb > 0 && 
            <span>{props.nb}</span>
        }
    </div>
    );
}