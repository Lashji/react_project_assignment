import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from '../App';
import { players } from '../mocks/players';
import { rest, server } from '../mocks/server';

test('should fetch players from backend when first loaded', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');

  expect(listItems.length).toEqual(players.length);
  listItems.forEach((item, i) => {
    expect(item.id).toBe(`player-${players[i].id}`);
  });
});

test('should show error status when loading players fails', async () => {
  server.use(
    rest.get(/\/api\/players$/, (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  render(<App />);
  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should fetch single player data from backend when link is clicked', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  expect(await screen.findByText('not active')).toBeInTheDocument();
  expect(screen.getByText(`${players[0].id}`, { selector: 'div.player-id' })).toBeInTheDocument();
  expect(screen.getByText(players[0].name, { selector: 'div.player-name' })).toBeInTheDocument();
});

test('should show error status when clicking link and loading player data fails', async () => {
  server.use(
    rest.get('/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  server.use(
    rest.get('http://localhost:3001/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
});

test('should send POST request to backend and add new player to "#players-list"', async () => {
  const { container } = render(<App />);
  const name = container.querySelector('input[name="name"]');
  await UserEvent.type(name, 'New Player', { delay: 10 });

  const form = container.querySelector('form');
  fireEvent.submit(form);

  await screen.findByText(/New Player/i, { selector: 'a' });
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length + 1);
  expect(container.querySelector('.request-status').textContent.trim()).toBe('');
});

test('should show error status and not add new player if POST request fails', async () => {
  server.use(
    rest.post(/\/api\/players$/, (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  const { container } = render(<App />);
  const name = container.querySelector('input[name="name"]');
  await UserEvent.type(name, 'New Player', { delay: 10 });

  const form = container.querySelector('form');
  fireEvent.submit(form);

  expect(await screen.findByText('An error has occurred!!!')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should send DELETE request to backend and delete player when "Delete" button is clicked', async () => {
  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  await UserEvent.click(linkElement);

  const button = await screen.findByText(/delete/i);
  UserEvent.click(button);

  await waitForElementToBeRemoved(() => screen.queryByText(players[0].name, { selector: 'a' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length - 1);
});

test('should show error status and not delete player if DELETE request fails', async () => {
  server.use(
    rest.delete('/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  server.use(
    rest.delete('http://localhost:3001/api/players/:playerId', (req, res, ctx) => {
      res(ctx.networkError('Network error'));
    })
  );

  render(<App />);
  const listItems = await screen.findAllByRole('listitem');
  const linkElement = listItems[0].querySelector('a');
  UserEvent.click(linkElement);

  const button = await screen.findByText(/delete/i);
  UserEvent.click(button);

  await screen.findByText('An error has occurred!!!');
  expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});
