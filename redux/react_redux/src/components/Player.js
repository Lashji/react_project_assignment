/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { removePlayer } from '../redux/actionCreators/playersActions';

export const Player = ({ name, isActive, id }) => {
	
	const dispatch = useDispatch()

	const handleRemove = (id) => {
		console.log("REMVE", id);
		dispatch(removePlayer(id))
	};
	
	return (<li id={`player-${id}`} className='player'>
		{name} {isActive ? "active" : "not active"}
		<button onClick={e => handleRemove(id)} className='remove-btn'>remove</button>
	</li>);
};
