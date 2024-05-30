import React from 'react';

function Notification({ message, onClose }) {
	return (
		<div className='fixed top-4 left-1/2 transform -translate-x-1/2 m-4 p-4 bg-yellow-500 text-black rounded shadow-lg'>
			<p>{message}</p>
		</div>
	);
}

export default Notification;
