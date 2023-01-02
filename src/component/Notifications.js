import { useEffect, useState } from "react";
import NotificationAlert from "./NotificationAlert";
import NotificationItem from "./NotificationItem";

import '../assets/scss/components/Notifications.scss';

const newNotifications = [
    // {
    //     "field": "feed",
    //     "value": {
    //         "item": "status",
    //         "post_id": "44444444_444444444",
    //         "verb": "add",
    //         "published": 1,
    //         "created_time": 1672652859,
    //         "message": "Example post content.",
    //         "from": {
    //             "name": "Test Page",
    //             "id": "265629506862072"
    //         }
    //     }
    // }
];

export default function Notifications(props) {

    const [notifications, setNotifications] = useState(newNotifications);
    const [showDetails, setShowDetails] = useState(false);
  
    useEffect(() => {
        const functionAddNotifications = (newNotifications) => {
            setNotifications([...newNotifications, ...notifications]);
        }
        const events = new EventSource(process.env.REACT_APP_WEBSOCKET_URL);
        events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData && parsedData.length > 0) {
                const entryData = parsedData[0];
                functionAddNotifications(entryData.changes);
            }
        }
        return () => {
            events.close();
          }
    }, [notifications]);

    const clickOnAlert = () => {
        setShowDetails(!showDetails);
    }

    const clickOnNotificationItem = (pageId) => {
        props.onNotificationItemClick(pageId);
        setShowDetails(false);
    }

    return (
        <div id="notifications">
            <NotificationAlert nb={notifications.length} onClick={clickOnAlert}/>
            {showDetails && (
                <div className='notifications-items'>
                    {notifications.length > 0 && notifications.map((notification, index) => {
                            return <NotificationItem notification={notification} key={index} onClick={clickOnNotificationItem}/>
                        })
                    }
                </div>
            )}
        </div>
    )
}