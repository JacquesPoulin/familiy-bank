// ! COMPOSANT 	PERMETTANT DE GÉRER LA NAVBAR INTERMEDIARE

// ! -- Imports --
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import componentList from '../data/componentList';

const ComponentNavbar = ({ activeComponent, toggleComponent }) => {
	return (
		<div className='w-full mt-12 p-4 flex justify-center items-center gap-8'>
			{componentList.map(({ id, nom, title, tag, icon }) => (
				<div key={id} className='flex justify-center items-center '>
					<FontAwesomeIcon
						icon={icon}
						className='mr-3 w-4 text-slate-50 hover:text-yellow-400'
					/>
					<button
						className={`text-white ${
							activeComponent === `${tag}` ? 'text-yellow-500' : ''
						} text-2xl tracking-widest hover:text-yellow-400`}
						title={title}
						onClick={() => toggleComponent(`${tag}`)}>
						{nom}
					</button>
				</div>
			))}
		</div>
	);
};

export default ComponentNavbar;
