import { render, fireEvent, screen } from '@testing-library/svelte';
import Profile from './Profile.svelte';

test('render <Profile /> and profile store', async () => {
	render(Profile);
	const displayName = screen.getByTestId('display-name');
	const displayAge = screen.getByTestId('display-age');

	expect(displayName).toHaveTextContent('');
	expect(displayAge).toHaveTextContent('');

	const inputName = screen.getByTestId('input-name') as HTMLInputElement;
	const inputAge = screen.getByTestId('input-age') as HTMLInputElement;

	await fireEvent.input(inputName, { target: { value: 'Sam Wilson' } });
	await fireEvent.input(inputAge, { target: { value: 99 } });

	expect(displayName).toHaveTextContent('Sam Wilson');
	expect(displayAge).toHaveTextContent('99');

	await fireEvent.input(inputName, { target: { value: 'Joe Brown' } });
	await fireEvent.input(inputAge, { target: { value: 35 } });

	expect(displayName).toHaveTextContent('Joe Brown');
	expect(displayAge).toHaveTextContent('35');
});
