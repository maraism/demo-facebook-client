export default function NotificationItem(props) {
    const {notification} = props;
    let actionType = '';
    if (notification.value.verb === 'add') {
        actionType = 'Nouveau post';
    }
    return (
        <div className='notification-item' onClick={() => props.onClick(notification.value.from.id)}>
            <div className='notification-item-from'>{notification.value.from.name}</div>
            <div className='notification-item-action'>{actionType}</div>
        </div>
    )
}