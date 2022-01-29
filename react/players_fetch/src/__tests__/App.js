import { render, screen, logRoles } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { server, rest } from '../mocks/server';
import App from '../App';
import { players } from '../mocks/players';

test('should fetch players from backend when first loaded', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  console.log("test")

  listItems.forEach(i => logRoles(i))

  expect(listItems.length).toEqual(players.length);
  listItems.forEach((item, i) => {
    expect(item.id).toEqual(`player-${players[i].id}`);
  });
});

test('should fetch single player data from backend when link is clicked', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  expect(await screen.findByText('not active')).toBeInTheDocument();
  expect(screen.getByText(players[0].name, { selector: 'div' }));
});

test('should show error status when request fails', async () => {
  console.log("should show error status when request fails")

  server.use(
    rest.get('/api/players', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  render(<App />);
  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});
