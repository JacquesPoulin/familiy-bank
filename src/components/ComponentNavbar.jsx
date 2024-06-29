// ! COMPOSANT 	PERMETTANT DE GÉRER LA NAVBAR INTERMEDIARE

// ! -- Imports --
import componentList from '../data/componentList';

const ComponentNavbar = ({ activeComponent, toggleComponent }) => {
	return (
		<div className='w-full mt-8 p-4 flex justify-center items-center gap-8'>
			{componentList.map(({ id, nom, title, tag }) => (
				<button
					key={id}
					className={`text-white ${
						activeComponent === `${tag}` ? 'text-yellow-500' : ''
					} text-2xl tracking-widest hover:text-yellow-200`}
					title={title}
					onClick={() => toggleComponent(`${tag}`)}>
					{nom}
				</button>
			))}
		</div>
	);
};

export default ComponentNavbar;
